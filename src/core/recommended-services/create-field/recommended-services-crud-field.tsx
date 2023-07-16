import { FunctionComponent, useCallback } from "react";
import { styled } from "styled-components";
import RecommendedServicesCrud from "core/recommended-services/form/recommended-services-crud";
import { FormControl, FormHelperText } from "@mui/material";
import useInputRecommendedServices from "./use-input-recommended-services";
import { InputRecommendedService } from "../types";
import { ChangeEventRecommendedServices, LocalRecommendedService } from "../form/types";

const RecommendedServicesCrudField: FunctionComponent<Props> = (
  {
    inputServices,
    onChange,
    onHandleFormChange,
    fieldName,
    error,
    helperText,
    modelId
  }
) => {
  const onChangeRecommendedServices = useCallback(
    (services: InputRecommendedService[]) => {
      onChange?.(services);

      const changeEventRecommendedServices
        = createChangeEvent(fieldName, services);
      onHandleFormChange(changeEventRecommendedServices);
    }, [fieldName, onChange, onHandleFormChange]
  );

  const { recommendedServices, onDelete, onUpdate, onCreate }
    = useInputRecommendedServices(modelId, inputServices, onChangeRecommendedServices);

  return (
    <FormControl error={error} fullWidth>
      <RecommendedServicesCrud
        modelId={modelId}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCreate={onCreate}
        items={recommendedServices}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

interface Props {
  helperText?: string;
  error?: boolean;
  fieldName: string;
  className?: string;
  inputServices: LocalRecommendedService[];
  onChange?: (services: InputRecommendedService[]) => void;
  onHandleFormChange: (services: ChangeEventRecommendedServices) => void;
  modelId: string;
}

function createChangeEvent(fieldName: string, services: InputRecommendedService[]): ChangeEventRecommendedServices
{
  return {
    target: {
      name: fieldName,
      id: fieldName,
      value: services,
    },
  } as unknown as ChangeEventRecommendedServices
}

export default styled(RecommendedServicesCrudField)``;
