import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from 'store';
import { Model } from 'core/models/types';
import getModel from 'services/models/get-model';

export default function useModelById(modelId: string | null) {
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<Model | null>(null);

  const fetchItem = useCallback(async (modelId: string) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getModel(modelId);
      setItem(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (modelId) fetchItem(modelId);
  }, [fetchItem, modelId]);

  return item;
};
