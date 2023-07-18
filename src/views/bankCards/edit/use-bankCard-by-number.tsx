import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import { BankCard } from 'core/bankCards/types';
import getBankCard from 'services/bankCards/get-bankCard';

export default function useBankCardById(cardNumber: string | null) {
  const dispatch = useAppDispatch();
  const [bankCard, setBankCard] = useState<BankCard | null>(null);

  const fetchBankCard = useCallback(async (cardNumber: string) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getBankCard(cardNumber);
      setBankCard(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cardNumber) fetchBankCard(cardNumber);
  }, [fetchBankCard, cardNumber]);

  return bankCard;
};
