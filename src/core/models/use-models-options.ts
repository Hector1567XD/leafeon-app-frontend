import { SelectOption } from "components/SelectField";
import { Model } from "core/models/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllModels from "services/models/get-all-models";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useModelsOptions(): SelectOption[] {
  const [models, setModels] = useState<Model[]>([]);
  const dispatch = useAppDispatch();

  const fetchModels = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllModels();
      setModels(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return models.map(model => ({
    label: (model.modelId+' -- '+model.brand),
    value: model.modelId,
  }));
}
