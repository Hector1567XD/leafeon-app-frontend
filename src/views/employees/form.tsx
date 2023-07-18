import { FunctionComponent, useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Formik, FormikHelpers } from "formik";
import { IconEdit, IconTrash } from "@tabler/icons";
// material-ui
import MainCard from "components/cards/MainCard";
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import SelectField from "components/SelectField";
import useAgencyOptions from "core/agencies/use-agency-options";
import useJobOptions from "core/jobs/use-jobs-options";
import useServicesOptions from "core/services/use-services-options";
import { IconCirclePlus } from "@tabler/icons";

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const isCreated = !isUpdate;
  const agencyOptions = useAgencyOptions();
  const jobOptions = useJobOptions();
  const serviceOptions = useServicesOptions();

  const extraValidations: any = isCreated
    ? {
        employeeDni: Yup.string()
          .max(8)
          .required("La cédula del empleado es requerida"),
      }
    : {};

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          ...extraValidations,
          name: Yup.string()
            .max(30)
            .required("El nombre del empleado es requerido"),
          phone: Yup.string()
            .max(11)
            .required("El teléfono principal del empleado es requerido"),
          address: Yup.string().required("La dirección es requerida"),
          salary: Yup.number().required("El salario es requerido"),
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
                {isCreated && (
                  <FormControl className="field-form" fullWidth>
                    <TextField
                      id="employeeDni"
                      label="Cédula"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.employeeDni}
                      helperText={touched.employeeDni ? errors.employeeDni : ""}
                      error={touched.employeeDni && !!errors.employeeDni}
                      name="employeeDni"
                    />
                  </FormControl>
                )}
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="name"
                    label="Nombre del empleado"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && !!errors.name}
                    name="name"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="phone"
                    label="Teléfono"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    helperText={touched.phone ? errors.phone : ""}
                    error={touched.phone && !!errors.phone}
                    name="phone"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="address"
                    label="Dirección"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    helperText={touched.address ? errors.address : ""}
                    error={touched.address && !!errors.address}
                    name="address"
                  />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="salary"
                    label="Salario"
                    type="number"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.salary}
                    helperText={touched.salary ? errors.salary : ""}
                    error={touched.salary && !!errors.salary}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    name="salary"
                  />
                </FormControl>
                <SelectField
                  fullWidth={true}
                  className="field-form"
                  name="agencyRif"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Agencia"
                  options={agencyOptions}
                  helperText={touched.agencyRif ? errors.agencyRif : ""}
                  error={touched.agencyRif && !!errors.agencyRif}
                  isAutocomplete={USE_AUTOCOMPLETES}
                  value={values.agencyRif}
                />
                <SelectField
                  fullWidth={true}
                  className="field-form"
                  name="jobId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Cargo"
                  options={jobOptions}
                  helperText={touched.jobId ? errors.jobId : ""}
                  error={touched.jobId && !!errors.jobId}
                  isAutocomplete={USE_AUTOCOMPLETES}
                  value={values.jobId}
                />
              </MainCard>
              <MainCard
                className={"form-data"}
                headerClass={"page-header-container"}
                title={
                  <div className={"page-header"}>
                    <span>Especialidades</span>
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
                                  label={`Especialidad ${index + 1}`}
                                  fullWidth
                                  isAutocomplete={USE_AUTOCOMPLETES}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.servicesIds[index]}
                                  options={serviceOptions}
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
                              <ErrorMessage
                                name={`servicesIds.${index}`}
                                component="div"
                                className="field-error"
                              />
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
  employeeDni: string;
  name: string;
  phone: string;
  address: string;
  salary: number;
  agencyRif: string;
  jobId: number;
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

  .service-list {
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
