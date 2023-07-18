import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import Form, { FormValues } from "../form";
import editPayment from "services/payments/edit-payment";
import usePaymentById from "./use-payment-by-id";
import { FormikHelpers } from "formik";
import usePaymentId from "./use-payment-id";

const EditState: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {billId, paymentId} = usePaymentId();
  const payment = usePaymentById(billId, paymentId);

  const onSubmit = useCallback(
    async (
      values: any,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      console.log(values);
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        await editPayment(billId!, paymentId!, values);
        navigate("/payments");
        dispatch(
          setSuccessMessage(
            `Pago editado correctamente`
          )
        );
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
    [dispatch, navigate, paymentId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Agencias
        </Typography>
      </MainCard>
      {payment && (
        <Form
          initialValues={{
            billId: payment.billId,
            paymentId: payment.paymentId,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            paymentMethod: payment.paymentMethod,
            cardNumber: payment.cardNumber,
            submit: null,
          }}
          isUpdate={true}
          title={"Editar pago"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditState)`
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
