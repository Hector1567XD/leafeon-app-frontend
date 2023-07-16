import { useCallback, useEffect, useState } from "react";
import { RecommendedServiceFormValues } from "../form/form";
import { LocalRecommendedService } from "../form/types";
import convertLocalToRecommendedServicesInput from "../form/utils/convert-local-to-recommended-services-input";
import { InputRecommendedService } from "../types";

const useInputRecommendedServices =
  (
    modelId: string,
    inputServices: LocalRecommendedService[],
    onChange: (services: InputRecommendedService[]) => void
  ) => {
  const [recommendedServices, setRecommendedServices] = useState<LocalRecommendedService[]>(inputServices);

  useEffect(() => {
    setRecommendedServices(inputServices);
  }, [inputServices]);

  useEffect(() => {
    const _inputServices = convertLocalToRecommendedServicesInput(modelId, recommendedServices);
    onChange(_inputServices);
  }, [recommendedServices, onChange, modelId]);

  const onDelete = useCallback((_: LocalRecommendedService, index: number) => {
    setRecommendedServices((prev) => {
      const newServices = [...prev];
      newServices.splice(index, 1);
      return newServices;
    });
  }, []);

  const onUpdate = useCallback((service: LocalRecommendedService, formValues: RecommendedServiceFormValues, index: number) => {
    setRecommendedServices((prev) => {
        const newServices = [...prev];
        newServices[index] = {
          ...service,
          ...formValues,
        };
        return newServices;
    });
  }, []);

  const onCreate = useCallback((formValues: RecommendedServiceFormValues) => {
    setRecommendedServices((prev) => {
      const newServices = [...prev] as LocalRecommendedService[];
      newServices.push(formValues as unknown as LocalRecommendedService);
      return newServices;
    });
  }, []);

  return { recommendedServices, onDelete, onUpdate, onCreate };
};

export default useInputRecommendedServices;
