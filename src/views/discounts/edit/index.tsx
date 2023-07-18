import { FunctionComponent, useCallback } from "react";
// material-ui
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import useDiscountById from "core/discounts/use-discount-by-id";
import editDiscount from "services/discounts/edit-discount";
import BackendError from "exceptions/backend-error";
import MainCard from "components/cards/MainCard";
import useDiscountId from "./use-discount-id";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Form, { FormValues } from "../form";
import styled from "styled-components";
import { useAppDispatch } from "store";
import { FormikHelpers } from "formik";

const EditDiscount: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const discountId = useDiscountId();
  const discount = useDiscountById(discountId);
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
        await editDiscount(discountId!, {
          ...values,
          percentage: +values.percentage,
          servicesMin: +values.servicesMin,
          servicesMax: +values.servicesMax,
        });
        navigate("/discounts");
        dispatch(setSuccessMessage(`Descuento editado correctamente`));
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
    [dispatch, navigate, discountId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Descuentos
        </Typography>
      </MainCard>
      {discount && (
        <Form
          initialValues={{
            percentage: discount.percentage,
            servicesMin: discount.servicesMin,
            servicesMax: discount.servicesMax,
            agencyRif: discount.agencyRif,
            submit: null,
          }}
          title={"Editar descuento"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditDiscount)`
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
