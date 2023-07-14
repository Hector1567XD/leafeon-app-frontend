import { FunctionComponent, useState } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import styled from 'styled-components';
import SelectField from 'components/SelectField';
import useStateOptions from 'core/states/use-state-options';
import useManagersOptions from 'core/managers/use-managers-options';
import useCitiesOptions from 'core/cities/use-cities-options';

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({ className, title, onSubmit, initialValues, isUpdate }) => {
  const stateOptions = useStateOptions();
  const [stateId, setStateId] = useState<number | null>(initialValues.stateId);
  const managersOptions = useManagersOptions({
    onlyAvailable: true,
    includeManager: isUpdate ? initialValues.managerDni : null,
  });
  const isCreated = !isUpdate;
  const citiesOptions = useCitiesOptions(stateId);

  const extraValidations: any = isCreated ? {
    agencyRif: Yup.string().max(30).required('El RIF de la agencia es requerido'),
  } : {};

  const statesHelperText = "Solo apareceran encargados disponibles sin ninguna agencia " + (isUpdate ? ", asi como tambien el encargado actualmente asignado." : "");

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={
          Yup.object().shape({
            businessName: Yup.string().max(30).required('El nombre es requerido'),
            cityId: Yup.number().typeError('La ciudad es invalida').required('La ciudad es requerida'),
            stateId: Yup.number().typeError('El estado es invalida').required('El estado es requerido'),
            managerDni: Yup.string().max(30).required('El encargado es requerido'),
            ...extraValidations,
          })
        }
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate  onSubmit={handleSubmit} >
            <MainCard className={'form-data'} contentClass={'form-content'} title={title}>
              {
                isCreated && 
                <FormControl className="field-form" >
                  <TextField
                    id="agencyRif"
                    label="RIF de Agencia"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.agencyRif}
                    helperText={touched.agencyRif ? errors.agencyRif : ''}
                    error={touched.agencyRif && !!errors.agencyRif}
                    name="agencyRif"
                  />
                </FormControl>
              }
              <FormControl className="field-form" >
                <TextField
                  id="businessName"
                  label="Nombre de agencia"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.businessName}
                  helperText={touched.businessName ? errors.businessName : ''}
                  error={touched.businessName && !!errors.businessName}
                  name="businessName"
                />
              </FormControl>
                <SelectField
                  className="field-form"
                  fullWidth={true}
                  name="managerDni"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Encargado"
                  options={managersOptions}
                  helperText={(touched.managerDni && errors.managerDni) ? errors.managerDni : statesHelperText}
                  error={touched.managerDni && !!errors.managerDni}
                  isAutocomplete={USE_AUTOCOMPLETES}
                  value={values.managerDni}
                />
              <SelectField
                className="field-form"
                name="stateId"
                onChange={(e) => {
                  handleChange(e);
                  setStateId(e.target.value as number);
                  handleChange({
                    target: { name: 'cityId', value: null }
                  });
                }}
                label="Estado"
                onBlur={handleBlur}
                options={stateOptions}
                helperText={touched.stateId ? errors.stateId : ''}
                error={touched.stateId && !!errors.stateId}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={stateId}
              />
              {
                (!!stateId || !!touched.cityId) && 
                <SelectField
                  disabled={!stateId && !touched.cityId}
                  className="field-form"
                  name="cityId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Ciudad"
                  options={citiesOptions}
                  helperText={touched.cityId ? errors.cityId : ''}
                  error={touched.cityId && !!errors.cityId}
                  isAutocomplete={USE_AUTOCOMPLETES}
                  value={values.cityId}
                />
              }
            </MainCard>
            <MainCard className={'form-data flex-column'}>
              {errors.submit && (
                  <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button variant="outlined" type="submit" color="primary">
                Guardar
              </Button>
            </MainCard>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface Props {
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
  isUpdate?: boolean;
}

export type FormValues = {
  agencyRif?: string;
  businessName: string;
  managerDni: string | null;
  stateId: number | null;
  cityId: number | null;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default styled(Form)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(50px, auto);
    grid-gap: 10px;
  }

  .field-form {
    margin: 12px 0px;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;
