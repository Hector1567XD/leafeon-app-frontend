import { FunctionComponent, useCallback } from "react";
// material-ui
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import useSupplyLineById from "core/supply-lines/use-supply-line-by-id";
import editSupplyLine from "services/supply-lines/edit-supply-line";
import BackendError from "exceptions/backend-error";
import MainCard from "components/cards/MainCard";
import useSupplyLineId from "./use-supply-line-id";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Form, { FormValues } from "../form";
import styled from "styled-components";
import { useAppDispatch } from "store";
import { FormikHelpers } from "formik";

const EditSupplyLine: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const supplyLineId = useSupplyLineId();
  const supplyLine = useSupplyLineById(supplyLineId);
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
        await editSupplyLine(supplyLineId!, values);
        navigate("/supply-lines");
        dispatch(
          setSuccessMessage(
            `Linea de suministro ${values.name} editada correctamente`
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
    [dispatch, navigate, supplyLineId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Lineas de suministro
        </Typography>
      </MainCard>
      {supplyLine && (
        <Form
          initialValues={{
            name: supplyLine.name,
            submit: null,
          }}
          title={"Editar linea de suministro"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditSupplyLine)`
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
