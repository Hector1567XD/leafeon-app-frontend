import { FunctionComponent } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import styled from "styled-components";

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const isCreated = !isUpdate;

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          cardNumber: Yup.string()
            .max(30)
            .required("El numero de tarjeta es requerido"),
          bank: Yup.string().max(30).required("El banco es requerido"),
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
            <MainCard className={"form-data"} title={title}>
              <FormControl className="field-form" fullWidth>
                {isCreated && (
                  <TextField
                    id="cardNumber"
                    label="Numero de tarjeta"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cardNumber}
                    helperText={touched.cardNumber ? errors.cardNumber : ""}
                    error={touched.cardNumber && !!errors.cardNumber}
                    name="cardNumber"
                  />
                )}
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="bank"
                  label="Banco"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bank}
                  helperText={touched.bank ? errors.bank : ""}
                  error={touched.bank && !!errors.bank}
                  name="bank"
                />
              </FormControl>
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
  isUpdate: boolean;
  initialValues: FormValues;
}

export type FormValues = {
  cardNumber: string;
  bank: string;
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
`;
