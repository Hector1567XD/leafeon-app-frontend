import { FunctionComponent, useCallback, useEffect, useState } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import { useNavigate, useParams } from 'react-router';
import { setSuccessMessage, setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';
import Form from './form';
import editState from 'services/states/edit-state';
import { State } from 'core/states/types';
import getState from 'services/states/get-state';


const EditState: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const [state, setState] = useState<State | null>(null);

  const fetchState = useCallback(async (stateId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getState(stateId);
      setState(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/states');
    }

    fetchState(params.id as any);
  }, [fetchState, navigate, params.id]);
  const stateId = params.id as unknown as number;

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    try {
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editState(stateId, values);
      navigate('/states');
      dispatch(setSuccessMessage(`Estado ${values.name} editado correctamente`));
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
  }, [dispatch, navigate, stateId]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Estados
        </Typography>
      </MainCard>
      {
        state && (
          <Form
            initialValues={{
              name: state.name,
              submit: null
            }}
            title={'Editar estado'}
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

export default styled(EditState)`
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
function setPaginate(paginate: any) {
  throw new Error('Function not implemented.');
}

