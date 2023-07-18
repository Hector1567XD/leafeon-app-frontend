import { FunctionComponent, useCallback } from "react";
// material-ui
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import useBillById from "core/bills/use-bill-by-id";
import BackendError from "exceptions/backend-error";
import MainCard from "components/cards/MainCard";
import editBill from "services/bills/edit-bill";
import useBillId from "./use-bill-id";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Form, { FormValues } from "../form";
import styled from "styled-components";
import { useAppDispatch } from "store";
import { FormikHelpers } from "formik";

const EditBill: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const billId = useBillId();
  const bill = useBillById(billId);
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
        await editBill(billId!, values);
        navigate("/bills");
        dispatch(setSuccessMessage(`Factura editada correctamente`));
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
    [dispatch, navigate, billId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Facturas
        </Typography>
      </MainCard>
      {bill && (
        <Form
          initialValues={{
            orderId: bill.orderId,
            submit: null,
          }}
          title={"Editar factura"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditBill)`
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
