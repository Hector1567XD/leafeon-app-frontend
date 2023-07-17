import { FunctionComponent, useCallback } from "react";
import { styled } from "styled-components";
import RecommendedServicesCrud from "core/recommended-services/form/recommended-services-crud";
import { FormControl } from "@mui/material";
import { RecommendedService } from "../types";
import { LocalRecommendedService } from "../form/types";
import deleteRecommendedService from "services/recommended-services/delete-recommended-service";
import editRecommendedService, { ServiceUpdatePayload } from "services/recommended-services/edit-recommended-service";
import { RecommendedServiceFormValues } from "../form/form";
import createRecommendedService from "services/recommended-services/create-recommended-service";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading, setSuccessMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";

const RecommendedServicesCrudWrapper: FunctionComponent<Props> = (
  {
    className,
    onRefresh,
    services,
    modelId,
  }
) => {
  const dispatch = useAppDispatch();

  const onDelete = useCallback(async (service: LocalRecommendedService, index: number) => {
    try {
      dispatch(setIsLoading(true));
      await deleteRecommendedService(
        modelId,
        service.serviceId,
        service.mileage
      )
      dispatch(setSuccessMessage(`Servicio recomendado eliminado con éxito`));
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
      onRefresh();
    }
  }, [dispatch, modelId, onRefresh]);

  const onUpdate = useCallback(async (service: LocalRecommendedService, formValues: RecommendedServiceFormValues, index: number) => {
    try {
      await editRecommendedService(
        modelId,
        service.serviceId,
        service.mileage,
        {
          useTime: +formValues.useTime
        }
      )
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
      onRefresh();
    }
  }, [dispatch, modelId, onRefresh]);

  const onCreate = useCallback(async (formValues: RecommendedServiceFormValues) => {
    try {
      await createRecommendedService(
        modelId,
        {
          modelId,
          mileage: +formValues.mileage,
          serviceId: +formValues.serviceId,
          useTime: +formValues.useTime
        },
      );
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
      onRefresh();
    }
  }, [dispatch, modelId, onRefresh]);

  return (
    <FormControl className={className} fullWidth>
      <RecommendedServicesCrud
        isParentUpdate={true}
        modelId={modelId}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCreate={onCreate}
        items={services}
      />
    </FormControl>
  );
};

interface Props {
  className?: string;
  modelId: string;
  onRefresh: () => void;
  services: RecommendedService[];
}

export default styled(RecommendedServicesCrudWrapper)``;
