import { Formik, FormikHelpers } from "formik";
import { FunctionComponent } from "react";
import * as Yup from "yup";
// material-ui
import styled from "styled-components";
import MainCard from "components/cards/MainCard";
import SelectField from "components/SelectField";
import useSupplyLineOptions from "core/supply-lines/use-supply-lines-options";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  Checkbox,
} from "@mui/material";

const USE_AUTOCOMPLETE = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isCreate,
}) => {
  const supplyLineOptions = useSupplyLineOptions();

  const extraValidations: any = isCreate
    ? {
        productId: Yup.string()
          .max(8)
          .required("El ID de producto es requerido"),
      }
    : {};

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={Yup.object().shape({
          ...extraValidations,
          shortNameProduct: Yup.string()
            .max(30)
            .required("El nombre es requerido"),
          price: Yup.number()
            .typeError("El precio es invalido")
            .required("El precio es requerido"),
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
              {isCreate && (
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="productId"
                    label="ID de producto"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productId}
                    helperText={touched.productId ? errors.productId : ""}
                    error={touched.productId && !!errors.productId}
                    name="productId"
                  />
                </FormControl>
              )}
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="shortNameProduct"
                  label="Nombre del producto"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shortNameProduct}
                  helperText={
                    touched.shortNameProduct ? errors.shortNameProduct : ""
                  }
                  error={touched.shortNameProduct && !!errors.shortNameProduct}
                  name="shortNameProduct"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  multiline
                  id="description"
                  label="Descripcion del producto"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  helperText={touched.description ? errors.description : ""}
                  error={touched.description && !!errors.description}
                  name="description"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="provider"
                  label="Proveedor"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.provider}
                  helperText={touched.provider ? errors.provider : ""}
                  error={touched.provider && !!errors.provider}
                  name="provider"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="price"
                  label="Precio"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  helperText={touched.price ? errors.price : ""}
                  error={touched.price && !!errors.price}
                  name="price"
                />
              </FormControl>
              <SelectField
                fullWidth={true}
                className="field-form"
                name="supplyLineId"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Linea de suministro"
                options={supplyLineOptions}
                helperText={touched.supplyLineId ? errors.supplyLineId : ""}
                error={touched.supplyLineId && !!errors.supplyLineId}
                isAutocomplete={USE_AUTOCOMPLETE}
                value={values.supplyLineId}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.isEcological}
                    onChange={handleChange}
                    name="isEcological"
                    color="primary"
                  />
                }
                name="isEcological"
                label="Ecologico"
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
  isCreate?: boolean;
}

export type FormValues = {
  productId?: number;
  shortNameProduct: string;
  description: string;
  provider: string;
  price: number;
  supplyLineId: number | null;
  isEcological: boolean;
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
