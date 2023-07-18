import { FunctionComponent, useCallback } from "react";
// material-ui
import styled from "styled-components";
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import BackendError from "exceptions/backend-error";
import createBill from "services/bills/create-bill";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";

const CreateBill: FunctionComponent<Props> = ({ className }) => {
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
        await createBill(values);
        navigate("/bills");
        dispatch(setSuccessMessage(`Factura creada correctamente`));
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
          Facturas
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          orderId: null,
          submit: null,
        }}
        title={"Crear factura"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateBill)`
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
