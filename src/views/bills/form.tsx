import { Formik, FormikHelpers } from "formik";
import { FunctionComponent } from "react";
// material-ui
import styled from "styled-components";
import MainCard from "components/cards/MainCard";
import SelectField from "components/SelectField";
import { Button, FormHelperText } from "@mui/material";
import useOrderOptions from "core/orders/use-orders-options";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import * as Yup from 'yup';

const USE_AUTOCOMPLETE = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
}) => {
  const ordersOptions = useOrderOptions();

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={onSubmit as any}
        validationSchema={
          Yup.object().shape({
            orderId: Yup.number().typeError('La orden es invalida').required('La orden es requerida'),
          })
        }
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
              <SelectField
                fullWidth={true}
                className="field-form"
                name="orderId"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Orden"
                options={ordersOptions}
                helperText={touched.orderId ? errors.orderId : ""}
                error={touched.orderId && !!errors.orderId}
                isAutocomplete={USE_AUTOCOMPLETE}
                value={values.orderId}
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
  orderId: number | null;
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
