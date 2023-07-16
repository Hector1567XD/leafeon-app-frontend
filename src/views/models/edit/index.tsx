import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import { useNavigate } from 'react-router';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from 'store';
import Form from '../form';
import editModel from 'services/models/edit-model';
import convertLocalToRecommendedServicesInput from 'core/recommended-services/form/utils/convert-local-to-recommended-services-input';
import useModelId from 'core/models/use-model-id';
import useModelById from 'core/models/use-model-by-id';

const EditModel: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modelId = useModelId();
  const { model } = useModelById(modelId);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editModel(
        modelId!!,
        {
          // Not send modelId and services on edit model
          brand: values.brand,
          description: values.description,
          modelKg: +values.modelKg,
          modelYear: values.modelYear,
          seatsQuantity: +values.seatsQuantity,
          refrigerantType: values.refrigerantType,
          engineOilType: values.engineOilType,
          oilBox: values.oilBox,
          octane: +values.octane,
        }
      );
      navigate('/models');
      dispatch(setSuccessMessage(`Modelo ${values.description} editado correctamente`));
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
  }, [dispatch, navigate, modelId]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Modelos
        </Typography>
      </MainCard>
      {
        model && (
          <Form
            inputServices={model?.services || []}
            initialValues={{
              modelId: model.modelId,
              description: model.description,
              brand: model.brand,
              modelKg: +model.modelKg,
              modelYear: model.modelYear,
              seatsQuantity: +model.seatsQuantity,
              refrigerantType: model.refrigerantType,
              engineOilType: model.engineOilType,
              oilBox: model.oilBox,
              octane: +model.octane,
              submit: null,
              // really this not be used
              services: convertLocalToRecommendedServicesInput(model.modelId, model?.services || []),
            }}
            isUpdate={true}
            title={'Editar modelo'}
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

export default styled(EditModel)`
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

