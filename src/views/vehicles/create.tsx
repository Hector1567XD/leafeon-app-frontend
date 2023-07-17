import { FunctionComponent, useCallback, useState } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import createVehicle from "services/vehicles/create-vehicle";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";
import dayjs, { Dayjs } from "dayjs";

const CreateVehicle: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Dayjs | null>(null);

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
        if (date) values.saleDate = date.format("YYYY-MM-DD");
        console.log("asss" + JSON.stringify(values));
        await createVehicle(values);
        navigate("/vehicles");
        dispatch(
          setSuccessMessage(
            `Vehiculo ${values.licensePlate} creado correctamente`
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
        setSubmitting(false);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Vehículos
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          licensePlate: "",
          nroSerial: "",
          nroMotor: "",
          //saleDate: dayjs(),
          saleDate: "",
          color: "",
          extraDescriptions: "",
          maintenanceSummary: "",
          agencySeller: "",
          modelId: "",
          clientDni: "",
          submit: null,
        }}
        setDate={setDate}
        title={"Crear vehículo"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateVehicle)`
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
