import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import { useNavigate } from 'react-router';
import { setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import Form from '../form';
import editJob from 'services/jobs/edit-job';
import useJobById from './use-job-by-id';
import useJobId from './use-job-id';

const EditJob: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const jobId = useJobId();
  const job = useJobById(jobId);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    try {
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editJob(jobId!, values);
      navigate('/jobs');
      dispatch(setSuccessMessage(`Cargo ${values.description} editado correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        setErrors({
          ...error.getFieldErrorsMessages(),
          submit: error.getMessage()
        });
      }
      setStatus({ success: false });
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, navigate, jobId]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Cargos
        </Typography>
      </MainCard>
      {
        job && (
          <Form
            initialValues={{
              description: job.description,
              submit: null
            }}
            title={'Editar cargo'}
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

export default styled(EditJob)`
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

