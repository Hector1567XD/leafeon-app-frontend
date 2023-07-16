import { FunctionComponent, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import { Button, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';
import SelectField from 'components/SelectField';
import useValidationSchema from './use-validation-schema';
import useAgenciesOptions from 'core/agencies/use-agencies-options';
import useProductsOptions from 'core/products/use-products-options';

const USE_AUTOCOMPLETES = false;

const CoordinatorsForm: FunctionComponent<Props> = ({
  className, onSubmit, initialValues, isUpdate, fixedAgencyRif
}) => {
  const isCreated = !isUpdate;
  const validationSchema = useValidationSchema();
  const agenciesOptions = useAgenciesOptions();
  const productsOptions = useProductsOptions();

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
            <FormControl
              className="field-form"
              fullWidth
              disabled={isUpdate || !!fixedAgencyRif}
            >
              <SelectField
                className="field-form"
                fullWidth={true}
                name="agencyRif"
                disabled={isUpdate || !!fixedAgencyRif}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Agencias"
                options={agenciesOptions}
                helperText={touched.agencyRif ? errors.agencyRif : ''}
                error={touched.agencyRif && !!errors.agencyRif}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.agencyRif}
              />
            </FormControl>
            <FormControl
              className="field-form"
              fullWidth
              disabled={isUpdate}
            >
              <SelectField
                className="field-form"
                fullWidth={true}
                name="productId"
                disabled={isUpdate}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Producto"
                options={productsOptions}
                helperText={touched.productId ? errors.productId : ''}
                error={touched.productId && !!errors.productId}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.productId}
              />
            </FormControl>
            <FormControl
              className="field-form"
              fullWidth
            >
              <TextField
                id="onStock"
                label="Stock"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.onStock}
                helperText={touched.onStock ? errors.onStock : ''}
                error={touched.onStock && !!errors.onStock}
                InputProps={{
                  endAdornment: <InputAdornment position="start">u</InputAdornment>
                }}
                name="onStock"
              />
            </FormControl>
            <FormControl className="field-form" fullWidth>
              <TextField
                id="minCapacity"
                label="Capacidad minima"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.minCapacity}
                helperText={touched.minCapacity ? errors.minCapacity : ''}
                error={touched.minCapacity && !!errors.minCapacity}
                InputProps={{
                  endAdornment: <InputAdornment position="start">u</InputAdornment>
                }}
                name="minCapacity"
              />
            </FormControl>
            <FormControl className="field-form" fullWidth>
              <TextField
                id="maxCapacity"
                label="Capacidad maxima"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maxCapacity}
                helperText={touched.maxCapacity ? errors.maxCapacity : ''}
                error={touched.maxCapacity && !!errors.maxCapacity}
                InputProps={{
                  endAdornment: <InputAdornment position="start">u</InputAdornment>
                }}
                name="maxCapacity"
              />
            </FormControl>
            {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
            )}
            <Button variant="outlined" type="submit" color="primary">
              { isCreated ? 'Agregar' : 'Editar' }
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface Props {
  className?: string;
  onSubmit: OnSubmit;
  initialValues: StocksFormValues;
  isUpdate?: boolean;
  fixedAgencyRif: string | null;
}

export type StocksFormValues = {
  agencyRif: string | null;
  productId: string | null;
  onStock: number,
  minCapacity: number,
  maxCapacity: number,
  submit: string | null;
};

export type OnSubmit = (
  values: StocksFormValues,
  helpers: FormikHelpers<StocksFormValues>
) => void | Promise<any>;

export default styled(CoordinatorsForm)`
  display: flex;
  flex-direction: column;

  .container-form-services {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* dos columnas de ancho igual */
    grid-column-gap: 20px; /* espacio entre las columnas */
  }

  @media screen and (max-width: 768px) { /* media query para dispositivos móviles */
    .container-form-services {
      grid-template-columns: 1fr; /* una sola columna */
      grid-column-gap: 0; /* sin espacio entre columnas */
      padding: 0; /* sin padding */
    }
  }

  .flex-column {
    display: flex;
    flex-direction: column;
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
