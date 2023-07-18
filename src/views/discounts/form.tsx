import { Formik, FormikHelpers } from "formik";
import { FunctionComponent } from "react";
import * as Yup from "yup";
// material-ui
import styled from "styled-components";
import MainCard from "components/cards/MainCard";
import SelectField from "components/SelectField";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import useAgenciesOptions from "core/agencies/use-agencies-options";

const USE_AUTOCOMPLETE = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
}) => {
  const agenciesOptions = useAgenciesOptions();

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={Yup.object().shape({
          percentage: Yup.number()
            .min(1)
            .max(100)
            .required("El porcentaje de descuento es requerido"),
        })}
        onSubmit={onSubmit as any}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard className={"form-data"} title={title}>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="percentage"
                  label="Porcentaje de descuento"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.percentage}
                  helperText={touched.percentage ? errors.percentage : ""}
                  error={touched.percentage && !!errors.percentage}
                  name="percentage"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="servicesMin"
                  label="Minimo"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.servicesMin}
                  helperText={touched.servicesMin ? errors.servicesMin : ""}
                  error={touched.servicesMin && !!errors.servicesMin}
                  name="servicesMin"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="servicesMax"
                  label="Maximo"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.servicesMax}
                  helperText={touched.servicesMax ? errors.servicesMax : ""}
                  error={touched.servicesMax && !!errors.servicesMax}
                  name="servicesMax"
                />
              </FormControl>
              <SelectField
                fullWidth={true}
                className="field-form"
                name="agencyRif"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Agencia"
                options={agenciesOptions}
                helperText={touched.agencyRif ? errors.agencyRif : ""}
                error={touched.agencyRif && !!errors.agencyRif}
                isAutocomplete={USE_AUTOCOMPLETE}
                value={values.agencyRif}
              />
            </MainCard>
            <MainCard className={"form-data flex-column"}>
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
}

export type FormValues = {
  percentage: number;
  servicesMin: number;
  servicesMax: number;
  agencyRif: string;
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

  .field-form {
    margin: 6px 0px;
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
