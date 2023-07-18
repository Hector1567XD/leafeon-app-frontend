import { useCallback, useEffect, useState } from "react";
// Own
import { useAppDispatch } from "store";
import { PaginateData } from "services/types";
import { Bill } from "core/bills/types";
import BackendError from "exceptions/backend-error";
import getPaginate from "services/bills/get-paginate";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [bills, setBills] = useState<Bill[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    total: 0,
    page: 1,
    perPage: 5,
    pages: 0,
  });

  const fetchBills = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate({ page, size: paginate.perPage });
      setBills(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.perPage]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  return { bills, paginate, setPage, fetchBills };
}
