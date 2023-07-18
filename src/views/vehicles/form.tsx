import { FunctionComponent, useMemo } from "react";
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
import dayjs, { Dayjs } from "dayjs";

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

  const validationSchema = useSchemaValidations(isCreated);

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
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

                <FormControl className="field-form"
                  error={touched.saleDate && !!errors.saleDate}
                  fullWidth
                >
                  <DatePicker
                    label="Fecha de compra"
                    value={
                      dayjs(values.saleDate)
                    }
                    onChange={(newValue: any) => {
                      const newValueFormatted = newValue.format("DD-MM-YYYY");//'DD-MM-AAAA HH:MM:SS'
                      console.log("FECHA VEHICULO FORMATED", newValueFormatted);
                      handleChange({
                        target: {
                          name: "saleDate",
                          id: "saleDate",
                          value: newValueFormatted || null,
                        } as any,
                      } as any);
                    }}
                  />
                  {(touched.saleDate && !!errors.saleDate) && (
                    <FormHelperText error>{touched.saleDate ? errors.saleDate : ""}</FormHelperText>
                  )}
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

function useSchemaValidations(isCreated: boolean) {
  return useMemo(() => {

    const extraValidations: any = isCreated
    ? {
        licensePlate: Yup.string()
          .max(16)
          .required("La matricula del vehiculo es requerida"),
      }
    : {};

    return Yup.object().shape({
          ...extraValidations,
          nroSerial: Yup
            .string()
            .required('Es necesario indicar una numero de serial del vehiculo')
            .max(64, 'El serial debe ser menor a 64 carácteres'),
          nroMotor: Yup
            .string()
            .required('Es necesario indicar una numero de motor del vehiculo')
            .max(64, 'El numero de motor debe ser menor a 64 carácteres'),
          color: Yup
            .string()
            .required('Es necesario indicar un color del vehiculo')
            .max(32, 'El color debe ser menor de 32 carácteres'),
          extraDescriptions: Yup
            .string()
            .required('Debe indicar una descripcion extra')
            .max(255, 'La descripcion extra debe ser menor a 255 carácteres'),
          maintenanceSummary: Yup
            .string()
            .required('Es necesario indicar el tiempo de mantenimiento')
            .max(255, 'El tiempo de mantenimiento debe ser menor a 255 carácteres'),
          agencySeller: Yup
            .string()
            .required('Es necesario indicar la agencia donde esta el vehiculo')
            .max(64, 'La agencia donde esta el vehiculo debe ser menor a 64 carácteres'),
          modelId: Yup
            .string()
            .required('Es necesario indicar el modelo del vehiculo')
            .max(64, 'El modelo del vehiculo debe ser menor a 64 carácteres'),
          clientDni: Yup
            .string()
            .required('Es necesario indicar el dni del cliente')
            .max(16, 'El dni del cliente debe ser menor a 16 caracteres'),
        });
  }, [isCreated]);
}

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
