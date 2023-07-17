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
import editBankCard from "services/bankCards/edit-bankCard";
import useBankCardByNumber from "./use-bankCard-by-number";
import useBankCardId from "./use-bankCard-id";
import { FormikHelpers } from "formik";

const EditBankCard: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cardNumber = useBankCardId();
  const bankCard = useBankCardByNumber(cardNumber);

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
        await editBankCard(cardNumber!, values);
        navigate("/bankCards");
        dispatch(
          setSuccessMessage(
            `Tarjeta ${values.description} editado correctamente`
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
        setStatus({ success: "false" });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, navigate, cardNumber]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Tarjetas
        </Typography>
      </MainCard>
      {bankCard && (
        <Form
          isUpdate={true}
          initialValues={{
            cardNumber: bankCard.cardNumber,
            bank: bankCard.bank,
            submit: null,
          }}
          title={"Editar tarjeta"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditBankCard)`
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
