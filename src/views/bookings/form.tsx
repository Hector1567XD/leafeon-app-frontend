import { FunctionComponent, useState } from "react";
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

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const [clientDni, setClientDni] = useState<string | null>(
    initialValues.clientDni
  );

  const serviceOptions = useServicesOptions();
  const clientOptions = useClientsOptions();
  const vehicleOptions = useVehiclesOptions(clientDni);

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          expirationDate: Yup.string().required("La fecha es requerida"),
          licensePlate: Yup.string().typeError('La matricula es invalida').required("La matricula es requerida"),
          clientDni: Yup.string()
            .max(8)
            .required("La cédula del cliente es requerida"),
          servicesIds: Yup.array().of(
            Yup.number().test(
              "not-zero",
              "Seleccione un servicio o elimine este campo",
              (value) => value !== 0
            )
          ),
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
              <MainCard className={"form-data"} title={title}>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="expirationDate"
                    label="Fecha de expiración"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.expirationDate}
                    helperText={
                      touched.expirationDate ? errors.expirationDate : ""
                    }
                    error={touched.expirationDate && !!errors.expirationDate}
                    name="expirationDate"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <SelectField
                    className="field-form"
                    name="clientDni"
                    onChange={(e) => {
                      handleChange(e);
                      setClientDni(e.target.value as string);
                      handleChange({
                        target: { name: "licensePlate", value: null },
                      });
                    }}
                    label="Cliente"
                    onBlur={handleBlur}
                    options={clientOptions}
                    helperText={touched.clientDni ? errors.clientDni : ""}
                    error={touched.clientDni && !!errors.clientDni}
                    isAutocomplete={USE_AUTOCOMPLETES}
                    value={clientDni}
                  />
                </FormControl>
                {(!!clientDni || !!touched.licensePlate) && (
                  <FormControl className="field-form" fullWidth>
                    <SelectField
                      disabled={!clientDni && !touched.licensePlate}
                      className="field-form"
                      name="licensePlate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Matriicula"
                      options={vehicleOptions}
                      helperText={
                        (!vehicleOptions.length) ? "Este cliente no tiene vehiculos" : (touched.licensePlate ? errors.licensePlate : "")
                      }
                      error={(!vehicleOptions.length) ? true : (touched.licensePlate && !!errors.licensePlate)}
                      isAutocomplete={USE_AUTOCOMPLETES}
                      value={values.licensePlate}
                    />
                  </FormControl>
                )}
                {/* <FormControl className="field-form" fullWidth>
                  <TextField
                    id="licensePlate"
                    label="Matrícula"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.licensePlate}
                    helperText={touched.licensePlate ? errors.licensePlate : ""}
                    error={touched.licensePlate && !!errors.licensePlate}
                    name="licensePlate"
                  />
                </FormControl> */}
              </MainCard>
              <MainCard
                className={"form-data"}
                headerClass={"page-header-container"}
                title={
                  <div className={"page-header"}>
                    <span>Servicios reservados</span>
                  </div>
                }
              >
                <div className={"a"}>
                  <FieldArray name="servicesIds">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.servicesIds.length > 0 &&
                          values.servicesIds.map((speciality, index) => (
                            <div
                              key={`service-${index}`}
                              className={"service-list"}
                            >
                              <FormControl className="field-form2" fullWidth>
                                <Field
                                  name={`servicesIds.${index}`}
                                  as={SelectField}
                                  type="text"
                                  label={`Servicio ${index + 1}`}
                                  fullWidth
                                  isAutocomplete={USE_AUTOCOMPLETES}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.servicesIds[index]}
                                  options={serviceOptions}
                                />
                                <ErrorMessage
                                  name={`servicesIds.${index}`}
                                  component="div"
                                  className="field-error"
                                />
                                <Button
                                  color="secondary"
                                  size="small"
                                  startIcon={<IconTrash />}
                                  onClick={() => remove(index)}
                                >
                                  Eliminar
                                </Button>
                              </FormControl>
                            </div>
                          ))}
                        <Button
                          type="button"
                          color="primary"
                          size="small"
                          variant={"outlined"}
                          onClick={() => push(0)}
                          startIcon={<IconCirclePlus />}
                        >
                          Añadir
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                  <FormControl
                    className="field-form2"
                    error={!!touched.servicesIds && !!errors.servicesIds}
                  >
                    {
                      !!touched.servicesIds && !!errors.servicesIds &&
                      <FormHelperText error>{errors.servicesIds}</FormHelperText>
                    }
                  </FormControl>
                </div>
              </MainCard>
            </div>
            <MainCard className={"form-data flex-column"}>
              {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button variant="outlined" type="submit" color="primary">
                Guardar
              </Button>
            </MainCard>
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
  title: string;
  initialValues: FormValues;
}

export type FormValues = {
  expirationDate: string;
  clientDni: string | null;
  licensePlate: string | null;
  servicesIds: number[];
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;

  .page-header-container {
    padding-bottom: 18.5px;
  }

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

  .field-form {
    margin: 12px 0px;
  }

  .container-form-employees {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* dos columnas de ancho igual */
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
