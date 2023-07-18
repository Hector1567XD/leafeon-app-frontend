import { FunctionComponent } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import type {} from "@mui/x-date-pickers/themeAugmentation";
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import styled from "styled-components";
import SelectField from "components/SelectField";
import useModelsOptions from "core/models/use-models-options";
import useClientsOptions from "core/clients/use-clients-options";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
  setDate,
}) => {
  const isCreated = !isUpdate;
  const clientOptions = useClientsOptions();
  const modelOptions = useModelsOptions();
  const extraValidations: any = isCreated
    ? {
        licensePlate: Yup.string()
          .max(8)
          .required("La matricula del empleado es requerida"),
      }
    : {};

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          ...extraValidations,
          nroMotor: Yup.string().required("El numero de motor es requerido"),
          nroSerial: Yup.string().required("El numero de serial es requerido"),
        })}
        onSubmit={onSubmit as any}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="container-form-vehicles">
              <MainCard className={"form-data"} title={title}>
                {isCreated && (
                  <FormControl className="field-form" fullWidth>
                    <TextField
                      id="licensePlate"
                      label="Matrícula"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.licensePlate}
                      helperText={
                        touched.licensePlate ? errors.licensePlate : ""
                      }
                      error={touched.licensePlate && !!errors.licensePlate}
                      name="licensePlate"
                    />
                  </FormControl>
                )}
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="nroSerial"
                    label="Número de serial"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nroSerial}
                    helperText={touched.nroSerial ? errors.nroSerial : ""}
                    error={touched.nroSerial && !!errors.nroSerial}
                    name="nroSerial"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="nroMotor"
                    label="Número de motor"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nroMotor}
                    helperText={touched.nroMotor ? errors.nroMotor : ""}
                    error={touched.nroMotor && !!errors.nroMotor}
                    name="nroMotor"
                  />
                </FormControl>
                {/* <FormControl className="field-form" fullWidth>
                    <DatePicker
                      label="Fecha de venta"
                      value={values.saleDate}
                      onChange={(value) => setDate(value)}
                    />
                  </FormControl> */}
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="saleDate"
                    label="Fecha de venta"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.saleDate}
                    helperText={touched.saleDate ? errors.saleDate : ""}
                    error={touched.saleDate && !!errors.saleDate}
                    name="saleDate"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="color"
                    label="Color"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.color}
                    helperText={touched.color ? errors.color : ""}
                    error={touched.color && !!errors.color}
                    name="color"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="extraDescriptions"
                    label="Descripción extra"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.extraDescriptions}
                    helperText={
                      touched.extraDescriptions ? errors.extraDescriptions : ""
                    }
                    error={
                      touched.extraDescriptions && !!errors.extraDescriptions
                    }
                    name="extraDescriptions"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="maintenanceSummary"
                    label="Resumen mantenimientos"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.maintenanceSummary}
                    helperText={
                      touched.maintenanceSummary
                        ? errors.maintenanceSummary
                        : ""
                    }
                    error={
                      touched.maintenanceSummary && !!errors.maintenanceSummary
                    }
                    name="maintenanceSummary"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="agencySeller"
                    label="Agencia vendedora"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.agencySeller}
                    helperText={touched.agencySeller ? errors.agencySeller : ""}
                    error={touched.agencySeller && !!errors.agencySeller}
                    name="agencySeller"
                  />
                </FormControl>
                <SelectField
                  fullWidth={true}
                  className="field-form"
                  name="modelId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Modelo"
                  options={modelOptions}
                  helperText={touched.modelId ? errors.modelId : ""}
                  error={touched.modelId && !!errors.modelId}
                  isAutocomplete={USE_AUTOCOMPLETES}
                  value={values.modelId}
                />
                <SelectField
                  fullWidth={true}
                  className="field-form"
                  name="clientDni"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Cliente"
                  options={clientOptions}
                  helperText={touched.clientDni ? errors.clientDni : ""}
                  error={touched.clientDni && !!errors.clientDni}
                  isAutocomplete={USE_AUTOCOMPLETES}
                  value={values.clientDni}
                />
              </MainCard>
            </div>
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
  isUpdate?: boolean;
  className?: string;
  onSubmit: OnSubmit;
  setDate: (arg0: Dayjs | null) => void;
  title: string;
  initialValues: FormValues;
}

export type FormValues = {
  licensePlate: string;
  nroSerial: string;
  nroMotor: string;
  //saleDate: Dayjs;
  saleDate: string;
  color: string;
  extraDescriptions: string;
  maintenanceSummary: string;
  agencySeller: string;
  modelId: string;
  clientDni: string;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;

  .page-header-container {
    padding-bottom: 18.5px;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
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

  .field-form {
    margin: 12px 0px;
  }

  .service-list {
    display: grid;
    grid-column-gap: 20px;
  }

  .field-form2 {
    margin: 12px 0px;
    grid-column-gap: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    /* media query para dispositivos móviles */
    .container-form-vehicles {
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
