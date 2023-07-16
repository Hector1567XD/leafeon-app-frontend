import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
//own
import BackendError from 'exceptions/backend-error';
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import Form, { FormValues } from '../form';
import editEmployee from 'services/employees/edit-employee';
import useEmployeeByDni from './use-employee-by-dni';
import useEmployeeDni from './use-employee-dni';
import { FormikHelpers } from 'formik';

const EditEmployee: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employeeDni = useEmployeeDni();
  const employee = useEmployeeByDni(employeeDni);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editEmployee(employeeDni!, values);
      navigate('/employees');
      dispatch(setSuccessMessage(`Empleado ${values.name} editado correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        setErrors({
          ...error.getFieldErrorsMessages(),
          submit: error.getMessage()
        });
        dispatch(setErrorMessage(error.getMessage()));
      }
      setStatus({ success: 'false'});
    } finally {
      dispatch(setIsLoading(false));
      setSubmitting(false);
    }
  }, [employeeDni, navigate, dispatch]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Empleados
        </Typography>
      </MainCard>
      {
        employee && (
          <Form
            isUpdate={true}
            initialValues={{
              employeeDni: employee.employeeDni,
              name: employee.name,
              phone: employee.phone,
              address: employee.address,
              salary: employee.salary,
              agencyRif: employee.agencyRif,
              jobId: employee.jobId,
              speciality: employee.name,
              submit: null,
            }}
            title={'Editar empleado'}
            onSubmit={onSubmit}
          />
        )
      }
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditEmployee)`
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

