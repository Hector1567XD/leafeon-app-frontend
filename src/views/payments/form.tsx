import { FunctionComponent, useMemo, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";
import SelectField from "components/SelectField";
import { DateTimePicker } from "@mui/x-date-pickers";
import useBankCardsOptions from "core/bankCards/use-bankCards-options";
import dayjs from 'dayjs';
import useBillsOptions from "core/bills/use-bills-options";

const USE_AUTOCOMPLETES = true;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const [paymentMethod, setPaymentMethod] = useState(initialValues.paymentMethod || null);
  const [billId, setBillId] = useState(initialValues.billId || null);
  const validationSchema = useMemo(() => {
    let extraFields = {};
    if (paymentMethod === "TD" || paymentMethod === "TC") {
      extraFields = {
        cardNumber: Yup.string().max(32).typeError("Tarjeta invalida").required("La tajeta es requerido"),
      };
    }

    return Yup.object().shape({
      billId: Yup.number().required('La factura es requerida'),
      amount: Yup.number().required("El monto es requerido"),
      paymentDate: Yup.string().required("La fecha de pago es requerida"),
      paymentMethod: Yup.string().required(
        "El metodo de pago es requerido"
      ),
      ...extraFields,
    });
  }, [paymentMethod]);

  const cardBanksOptions = useBankCardsOptions();
  const billsOptions = useBillsOptions();

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
              <SelectField
                disabled={isUpdate}
                className="field-form"
                fullWidth={true}
                name="billId"
                onChange={(e) => {
                  handleChange(e);
                  setBillId(e.target.value as any);
                }}
                onBlur={handleBlur}
                label="Factura"
                options={billsOptions}
                error={touched.billId && !!errors.billId}
                isAutocomplete={false}
                value={values.billId}
              />
              {
                billId && (
                  <>
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
                    <FormControl className="field-form"
                      error={touched.paymentDate && !!errors.paymentDate}
                    >
                      <DateTimePicker
                        label="Fecha de pago"
                        value={
                          dayjs(values.paymentDate)
                        }
                        onChange={(newValue: any) => {
                          const newValueFormatted = newValue.format("DD-MM-YYYY HH:mm:ss");//'DD-MM-AAAA HH:MM:SS'
                          console.log(newValueFormatted);
                          handleChange({
                            target: {
                              name: "paymentDate",
                              id: "paymentDate",
                              value: newValueFormatted || null,
                            } as any,
                          } as any);
                        }}
                      />
                      {(touched.paymentDate && !!errors.paymentDate) && (
                        <FormHelperText error>{touched.paymentDate ? errors.paymentDate : ""}</FormHelperText>
                      )}
                    </FormControl>
                    <SelectField
                      className="field-form"
                      fullWidth={true}
                      name="paymentMethod"
                      onChange={(e) => {
                        handleChange(e)
                        setPaymentMethod(e.target.value as any)
                      }}
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
                      isAutocomplete={false}
                      value={values.paymentMethod}
                    />
                    {((paymentMethod === "TD") ||
                      (paymentMethod === "TC")) && (
                      <SelectField
                        className="field-form"
                        fullWidth={true}
                        name="cardNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Tarjeta"
                        options={cardBanksOptions}
                        error={touched.cardNumber && !!errors.cardNumber}
                        isAutocomplete={USE_AUTOCOMPLETES}
                        value={values.cardNumber}
                      />
                    )}
                  </>
                )
              }
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
