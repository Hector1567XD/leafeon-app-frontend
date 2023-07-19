import { useCallback, useEffect, useState } from 'react';
// Own
import { Recommendation } from 'core/recommendations/types';
import getRecommendations from 'services/bookings/get-recomendations';
import { useAppDispatch } from 'store';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';

export default function useRecomendations() {
  const dispatch = useAppDispatch();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [mileage, setMileage] = useState<number>(0);

  const fetchRecommendations = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getRecommendations( licensePlate, mileage );
      setRecommendations(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, licensePlate, mileage]);

  useEffect(() => {
    console.log("buscando")
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { recommendations, setLicensePlate, setMileage, mileage, fetchRecommendations };
}
