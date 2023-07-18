import { useCallback, useEffect, useState } from 'react';
// Own
import { useAppDispatch } from 'store';
import { PaginateData } from 'services/types';
import BackendError from 'exceptions/backend-error';
import { SupplyLine } from "core/supply-lines/types";
import getPaginate from 'services/supply-lines/get-paginate';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [supplyLines, setSupplyLines] = useState<SupplyLine[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    total: 0,
    page: 1,
    perPage: 5,
    pages: 0,
  });

  const fetchSupplyLines = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate({ page, size: paginate.perPage });
      setSupplyLines(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.perPage]);

  useEffect(() => {
    fetchSupplyLines();
  }, [fetchSupplyLines]);

  return { supplyLines, paginate, setPage, fetchSupplyLines };
}
