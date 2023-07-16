import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import { useNavigate } from 'react-router';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import createModel from 'services/models/create-model';
import { useAppDispatch } from 'store';
import Form from './form';

const INPUT_SERVICES: any = [];
const INITIAL_VALUES: any = {
          modelId: '',
          brand: '',
          description: '',
          modelKg: 0,
          modelYear: '',
          seatsQuantity: 0,
          refrigerantType: '',
          engineOilType: '',
          oilBox: '',
          octane: 0,
          services: [],
          submit: null,
        };

const CreateService: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    console.log(values)
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await createModel({
        modelId: values.modelId,
        brand: values.brand,
        description: values.description,
        modelKg: +values.modelKg,
        modelYear: values.modelYear,
        seatsQuantity: +values.seatsQuantity,
        refrigerantType: values.refrigerantType,
        engineOilType: values.engineOilType,
        oilBox: values.oilBox,
        octane: +values.octane,
        services: values.services,
      });
      navigate('/models');
      dispatch(setSuccessMessage(`Servicio ${values.description} creada correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        setErrors({
          ...error.getFieldErrorsMessages(),
          submit: error.getMessage()
        });
        dispatch(setErrorMessage(error.getMessage()));
      }
      setStatus({ success: false });
    } finally {
      dispatch(setIsLoading(false));
      setSubmitting(false);
    }
  }, [dispatch, navigate]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Modelos
        </Typography>
      </MainCard>

      <Form
        inputServices={INPUT_SERVICES}
        initialValues={INITIAL_VALUES}
        title={'Crear servicio'}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateService)`
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
