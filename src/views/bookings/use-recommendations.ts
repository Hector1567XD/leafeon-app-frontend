import { useCallback, useEffect, useState } from 'react';
// Own
import { Recommendation } from 'core/recommendations/types';
import getRecommendations from 'services/bookings/get-recomendations';
import { useAppDispatch } from 'store';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';

export default function useRecomendations(licensePlate: string | null, agencyRif: string | null) {
  const dispatch = useAppDispatch();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [mileage, setMileage] = useState<number>(0);
  
  const fetchRecommendations = useCallback(async () => {
    console.log('really licence plate', licensePlate);
    try {
      dispatch(setIsLoading(true));
      const response = await getRecommendations( licensePlate || '', mileage, agencyRif || '');
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

  return { recommendations, setMileage, mileage, fetchRecommendations };
}
