import { FunctionComponent, useCallback, useState } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { FormikHelpers } from "formik";
import dayjs, { Dayjs } from "dayjs";
//own
import BackendError from "exceptions/backend-error";
import { useAppDispatch } from "store/index";
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
} from "store/customizationSlice";
import Form, { FormValues } from "../form";
import editVehicle from "services/vehicles/edit-vehicle";
import useVehicleByLicense from "./use-vehicle-by-license";
import useVehicleLicense from "./use-vehicle-license";

const EditVehicle: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const licensePlate = useVehicleLicense();
  const vehicle = useVehicleByLicense(licensePlate);
  const [date, setDate] = useState<Dayjs | null>(null);

  const onSubmit = useCallback(
    async (
      values: any,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        values.saleDate = values.saleDate.format('YYYY-MM-DD');
        console.log("asss" + JSON.stringify(values));
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        await editVehicle(licensePlate!, values);
        navigate("/vehicles");
        dispatch(
          setSuccessMessage(`Vehículo ${values.licensePlate} editado correctamente`)
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
    [licensePlate, navigate, dispatch]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Vehículos
        </Typography>
      </MainCard>
      {vehicle && (
        <Form
          isUpdate={true}
          initialValues={{
            licensePlate: vehicle.licensePlate,
            nroSerial: vehicle.nroSerial,
            nroMotor: vehicle.nroMotor,
            //saleDate: dayjs(vehicle.saleDate),
            saleDate: vehicle.saleDate,
            color: vehicle.color,
            extraDescriptions: vehicle.extraDescriptions,
            maintenanceSummary: vehicle.maintenanceSummary,
            agencySeller: vehicle.agencySeller,
            modelId: vehicle.modelId,
            clientDni: vehicle.clientDni,
            submit: null,
          }}
          title={"Editar vehículo"}
          setDate={setDate}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditVehicle)`
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
