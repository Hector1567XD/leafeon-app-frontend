import { FunctionComponent, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
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
import useClientsOptions from "core/clients/use-clients-options";

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const serviceOptions = useServicesOptions();
  const clientOptions = useClientsOptions();

  const [selectedServices, setSelectedServices] = useState<boolean>(false);
  const [numberSpecialities, setNumberSpecialities] = useState<number>(1);

  const handleAdd = () => {
    if (selectedServices) {
      setNumberSpecialities(numberSpecialities + 1);
      setSelectedServices(false);
    }
  };

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          clientDni: Yup.string()
            .max(30)
            .required("La cédula del cliente es requerida"),
          licensePlate: Yup.string()
            .max(30)
            .required("La matrícula del auto es requerida"),
          service: Yup.string()
            .max(11)
            .required("Debe reservar algún servicio"),
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
            <MainCard className={"form-data"} title={title}>
              <SelectField
                fullWidth={true}
                className="field-form"
                name="clientDni"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Cédula del cliente"
                options={clientOptions}
                helperText={touched.clientDni ? errors.clientDni : ""}
                error={touched.clientDni && !!errors.clientDni}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.clientDni}
              />
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="licensePlate"
                  label="Matrícula"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.licensePlate}
                  helperText={touched.licensePlate ? errors.licensePlate : ""}
                  error={touched.licensePlate && !!errors.licensePlate}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  name="licensePlate"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="ServiceId"
                  label="Servicios"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.servicesId}
                  helperText={touched.servicesId ? errors.servicesId : ""}
                  error={touched.servicesId && !!errors.servicesId}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  name="Service"
                />
              </FormControl>
            </MainCard>
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
  clientDni: string;
  licensePlate: string;
  servicesId: number;
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
`;
