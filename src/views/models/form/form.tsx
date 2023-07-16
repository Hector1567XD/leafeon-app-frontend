import { FunctionComponent, useMemo } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import RecommendedServicesCreateField from 'core/recommended-services/create-field/recommended-services-crud-field';
import { Props } from './types';
import getErrorOnArrayOrText from 'helpers/get-error-on-array-or-text';
import ObjectSchema, { ObjectShape } from 'yup/lib/object';

const Form: FunctionComponent<Props> = ({
  className, title, onSubmit, initialValues, isUpdate, inputServices
}) => {
  const isCreated = !isUpdate;
  const validationSchema = useValidationSchema(isCreated);

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <div
              className={`container-form-services ${isUpdate && 'container-form-services-full-grid'}`}
            >
              <MainCard className={'form-data'} contentClass={'form-content'} title={title}>
                <FormControl className="field-form" fullWidth disabled={isUpdate}>
                  <TextField
                    disabled={isUpdate}
                    id="modelId"
                    label="ID de modelo"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.modelId}
                    helperText={touched.modelId ? errors.modelId : ''}
                    error={touched.modelId && !!errors.modelId}
                    name="modelId"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="description"
                    label="Descripcion de modelo"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    helperText={touched.description ? errors.description : ''}
                    error={touched.description && !!errors.description}
                    name="description"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="brand"
                    label="Marca"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.brand}
                    helperText={touched.brand ? errors.brand : ''}
                    error={touched.brand && !!errors.brand}
                    name="brand"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="modelYear"
                    label="Año de modelo"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.modelYear}
                    helperText={touched.modelYear ? errors.modelYear : ''}
                    error={touched.modelYear && !!errors.modelYear}
                    name="modelYear"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="refrigerantType"
                    label="Tipo de refrigeracion"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.refrigerantType}
                    helperText={touched.refrigerantType ? errors.refrigerantType : ''}
                    error={touched.refrigerantType && !!errors.refrigerantType}
                    name="refrigerantType"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="engineOilType"
                    label="Tipo de aceite de motor"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.engineOilType}
                    helperText={touched.engineOilType ? errors.engineOilType : ''}
                    error={touched.engineOilType && !!errors.engineOilType}
                    name="engineOilType"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="oilBox"
                    label="Caja de aceite"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.oilBox}
                    helperText={touched.oilBox ? errors.oilBox : ''}
                    error={touched.oilBox && !!errors.oilBox}
                    name="oilBox"
                  />
                </FormControl>
                {/**/}
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="seatsQuantity"
                    label="Cantidad de asientos"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.seatsQuantity}
                    helperText={touched.seatsQuantity ? errors.seatsQuantity : ''}
                    error={touched.seatsQuantity && !!errors.seatsQuantity}
                    name="seatsQuantity"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="modelKg"
                    label="Peso del vehiculo"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.modelKg}
                    helperText={touched.modelKg ? errors.modelKg : ''}
                    error={touched.modelKg && !!errors.modelKg}
                    name="modelKg"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="octane"
                    label="Octanagea"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.octane}
                    helperText={touched.octane ? errors.octane : ''}
                    error={touched.octane && !!errors.octane}
                    name="octane"
                  />
                </FormControl>
              </MainCard>
              {
                isCreated && (
                  <div className={'form-data activites-crud'}>
                    <RecommendedServicesCreateField
                      modelId={values.modelId}
                      //NOT use inputServices={values.services} (for moment)
                      inputServices={inputServices}
                      fieldName={'services'}
                      onHandleFormChange={handleChange}
                      helperText={touched.services ? (getErrorOnArrayOrText(errors.services)) : ''}
                      error={touched.services && !!errors.services}
                    />
                  </div>
                )
              }
            </div>
            <MainCard className={'form-data flex-column'}>
              {errors.submit && (<FormHelperText error>{errors.submit}</FormHelperText>)}
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


function useValidationSchema(isCreated: boolean): ObjectSchema<ObjectShape> {
  return useMemo(() => {
    let extraValidationSchema = {};
    if (isCreated) {
      extraValidationSchema = {
        modelId: Yup.string()
                .required('Es necesario indicar el código del modelo de vehículo')
          .max(64, 'El código del modelo del vehículo debe tener menos de 64 caracteres'),
        services: Yup.array(),
      }
    }

    return Yup.object().shape({
      ...extraValidationSchema,
      description: Yup.string()
        .required('Es necesario agregar una descripción del modelo del vehículo')
        .max(64, 'El modelo debe tener menos de 64 caracteres'),
      brand: Yup.string()
        .required('Es necesario indicar una marca del modelo del vehículo')
        .max(64, 'El nombre debe tener menos de 64 caracteres'),
      modelKg: Yup.number().min(1, 'El peso debe ser mayor o igual a 1'),
      modelYear: Yup.string()
        .required('Es necesario indicar un año de modelo de vehículo')
        .max(4, 'El año del modelo debe tener menos de 4 caracteres')
        .matches(/^\d+$/, 'La fecha debe estar escrita en números'),
      seatsQuantity: Yup.number().min(1, 'La cantidad de asientos debe ser mayor o igual a 1'),
      refrigerantType: Yup.string()
        .required('Es necesario indicar un tipo de refrigerante')
        .max(32, 'El nombre del refrigerante debe tener menos de 32 caracteres'),
      engineOilType: Yup.string()
        .required('Es necesario indicar el tipo de aceite del modelo del vehículo')
        .max(32, 'El tipo de aceite del modelo del vehículo debe tener menos de 32 caracteres'),
      oilBox: Yup.string()
        .required('Es necesario indicar un modelo de caja de aceite')
        .max(32, 'El modelo de caja de aceite debe tener menos de 32 caracteres'),
      octane: Yup.number().min(1, 'El octanaje debe ser mayor o igual a 1'),
    });
  }, [isCreated]);
}

export default Form;
