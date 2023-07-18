import { FunctionComponent, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";
import SelectField from "components/SelectField";

const USE_AUTOCOMPLETES = false;

/* Mira, estoy no ingresando los id. Por lo que vi en la bd se los tengo que 
pasar, pero no creo que deberia. Lo dejo asi de momento. Tambien creo que seria 
muy incomodo mostrar todas las tarjetas registradas. Lo deje como input y ya */

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={Yup.object().shape({
          amount: Yup.number().max(30).typeError("Monto invalido").required("El monto es requerido"),
          paymentDate: Yup.string().required("La fecha de pago es requerida"),
          paymentMethod: Yup.string().required(
            "El metodo de pago es requerido"
          ),
          cardNumber: Yup.string().max(32).typeError("Tarjeta invalida").required("La tajeta es requerido"),
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
            <MainCard
              className={"form-data"}
              contentClass={"form-content"}
              title={title}
            >
              <FormControl className="field-form">
                <TextField
                  id="amount"
                  label="Monto"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  helperText={touched.amount ? errors.amount : ""}
                  error={touched.amount && !!errors.amount}
                  name="amount"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </FormControl>
              <FormControl className="field-form">
                <TextField
                  id="paymentDate"
                  label="Fecha de pago"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.paymentDate}
                  helperText={touched.paymentDate ? errors.paymentDate : ""}
                  error={touched.paymentDate && !!errors.paymentDate}
                  name="paymentDate"
                />
              </FormControl>
              <SelectField
                className="field-form"
                fullWidth={true}
                name="paymentMethod"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Modalidad"
                options={[
                  { value: "E", label: "Efectivo" },
                  { value: "D", label: "Efectivo en divisas" },
                  { value: "T", label: "Transferencia" },
                  { value: "TD", label: "Tarjeta de debito" },
                  { value: "TC", label: "Tarjeta de credito" },
                ]}
                error={touched.paymentMethod && !!errors.paymentMethod}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.paymentMethod}
              />
              {((values.paymentMethod == "TD") ||
                (values.paymentMethod == "TC")) && (
                <FormControl className="field-form">
                  <TextField
                    id="cardNumber"
                    label="Tarjeta"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cardNumber}
                    helperText={touched.cardNumber ? errors.cardNumber : ""}
                    error={touched.cardNumber && !!errors.cardNumber}
                    name="cardNumber"
                  />
                </FormControl>
              )}
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
  isUpdate?: boolean;
}

export type FormValues = {
  billId: number;
  paymentId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  cardNumber: string | null;
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
