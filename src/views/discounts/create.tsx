import { FunctionComponent, useCallback } from "react";
// material-ui
import styled from "styled-components";
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import BackendError from "exceptions/backend-error";
import createDiscount from "services/discounts/create-discount";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";

const CreateDiscount: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (
      values: any,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        await createDiscount({
          ...values,
          percentage: +values.percentage,
          servicesMin: +values.servicesMin,
          servicesMax: +values.servicesMax,
        });
        navigate("/discounts");
        dispatch(setSuccessMessage(`Descuento creado correctamente`));
      } catch (error) {
        if (error instanceof BackendError) {
          setErrors({
            ...error.getFieldErrorsMessages(),
            submit: error.getMessage(),
          });
          dispatch(setErrorMessage(error.getMessage()));
        }
        setStatus({ success: false });
      } finally {
        dispatch(setIsLoading(false));
        setSubmitting(false);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Descuentos
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          percentage: 0,
          servicesMin: 0,
          servicesMax: 0,
          agencyRif: "",
          submit: null,
        }}
        title={"Crear descuento"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateDiscount)`
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
`;
