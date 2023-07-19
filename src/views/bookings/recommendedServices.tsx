import { FunctionComponent, useCallback, useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Formik, FormikHelpers } from "formik";
import { IconEdit, IconTrash } from "@tabler/icons";
// material-ui
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import styled from "styled-components";
import SelectField from "components/SelectField";
import useServicesOptions from "core/services/use-services-options";
import useClientsOptions from "core/clients/use-clients-options";
import useVehiclesOptions from "core/vehicles/use-vehicles-options";
import { IconCirclePlus } from "@tabler/icons";
import useRecomendations from "./use-recommendations";
import { useAppDispatch } from "../../store/index";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import DynamicTable from "components/DynamicTable";
const USE_AUTOCOMPLETES = false;

const RecommendedServices: FunctionComponent<Props> = ({
  className,
  initialValues,
}) => {
  const dispatch = useAppDispatch();
  const { recommendations, setLicensePlate, setMileage, fetchRecommendations } =
    useRecomendations();

  const a = [
    {
      serviceId: 1,
      description: "string",
      totalCost: 25,
      mileage: 45,
      useTime: 4,
    },
    {
      serviceId: 1,
      description: "string",
      totalCost: 25,
      mileage: 45,
      useTime: 4,
    },
    {
      serviceId: 1,
      description: "string",
      totalCost: 25,
      mileage: 45,
      useTime: 4,
    },
  ];

  const onSubmit = useCallback(
    async (
      values: any,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        console.log("as" + JSON.stringify(values));
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        setLicensePlate(values.licensePlate);
        setMileage(values.mileage);
        await fetchRecommendations();
        dispatch(setSuccessMessage(`Servicios buscados correctamente`));
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
    [dispatch, fetchRecommendations, setLicensePlate, setMileage]
  );

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          mileage: Yup.number().required("El kilometraje es requerido"),
          licensePlate: Yup.string().required("La matricula es requerida"),
        })}
        onSubmit={onSubmit as any}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="container-form-employees">
              <MainCard
                title={"Buscar servicios Recomendados"}
              >
                <div className="form-data" >
                  <FormControl className="field-form" fullWidth>
                    <TextField
                      id="licensePlate"
                      label="Matricula"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.licensePlate}
                      helperText={
                        touched.licensePlate ? errors.licensePlate : ""
                      }
                      error={touched.licensePlate && !!errors.licensePlate}
                      name="licensePlate"
                    />
                  </FormControl>
                  <FormControl className="field-form" fullWidth>
                    <TextField
                      id="mileage"
                      label="Kilometraje"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mileage}
                      helperText={touched.mileage ? errors.mileage : ""}
                      error={touched.mileage && !!errors.mileage}
                      name="mileage"
                    />
                  </FormControl>
                </div>
                {errors.submit && (
                  <FormHelperText error>{errors.submit}</FormHelperText>
                )}
                <Button
                  variant="outlined"
                  type="submit"
                  color="primary"
                  className="button"
                >
                  Buscar
                </Button>
                <hr />
                {a.length>1 ? <DynamicTable
                  headers={[
                    {
                      columnLabel: "Id",
                      fieldName: "serviceId",
                      cellAlignment: "left",
                    },
                    {
                      columnLabel: "Descripcion",
                      fieldName: "description",
                      cellAlignment: "left",
                    },
                    {
                      columnLabel: "Costo total",
                      fieldName: "totalCost",
                      cellAlignment: "left",
                    },
                  ]}
                  rows={recommendations}
                /> : "No hay servicios recomemdados"}
              </MainCard>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface Props {
  isUpdate?: boolean;
  className?: string;
  onSubmit: OnSubmit;
  licensePlate: string | null;
  initialValues: FormValues;
}

export type FormValues = {
  mileage: number;
  licensePlate: string;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default styled(RecommendedServices)`
  display: flex;
  flex-direction: column;
  width: 100%;

  .button {
    margin-bottom: 20px;
  }

  .page-header-container {
    padding-bottom: 18.5px;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* dos columnas de ancho igual */
    grid-column-gap: 20px; /* espacio entre las columnas */
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .field-form {
    margin: 12px 0px;
  }

  .container-form-employees {
    display: grid;
    grid-template-columns: repeat(1, 1fr); /* dos columnas de ancho igual */
    grid-column-gap: 20px; /* espacio entre las columnas */
  }

  . {
    display: grid;
    grid-column-gap: 20px;
  }

  .field-form2 {
    margin: 12px 0px;
    grid-column-gap: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    /* media query para dispositivos móviles */
    .container-form-employees {
      grid-template-columns: 1fr; /* una sola columna */
      grid-column-gap: 0; /* sin espacio entre columnas */
      padding: 0; /* sin padding */
    }
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .field-form {
    margin: 12px 0px;
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
