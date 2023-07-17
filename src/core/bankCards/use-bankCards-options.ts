import { SelectOption } from "components/SelectField";
import { BankCard } from "core/bankCards/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllBankCards from "services/bankCards/get-all-bankCards";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useBankCardsOptions(cardNumber: string | null): SelectOption[] {
  const [bankCards, setBankCards] = useState<BankCard[]>([]);
  const dispatch = useAppDispatch();

  const fetchBankCards = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllBankCards();
      setBankCards(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBankCards();
  }, [fetchBankCards]);

  return bankCards.map(bankCard => ({
    label: bankCard.cardNumber+' -- '+bankCard.bank,
    value: bankCard.cardNumber,
  }));
}
