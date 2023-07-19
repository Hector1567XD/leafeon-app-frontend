import { useCallback, useEffect, useState } from "react";
// Own
import { useAppDispatch } from "store";
import { PaginateData } from "services/types";
import BackendError from "exceptions/backend-error";
import getFrecuentModelsByService from "services/stadistics/get-frequent-models-by-service";
import { FrecuentModelsByService } from "services/stadistics/types";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [frecuentModelsByService, setFrecuentModelsByService] = useState<FrecuentModelsByService[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    total: 0,
    page: 1,
    perPage: 5,
    pages: 0,
  });

  const fetchFrecuentModelsByService = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getFrecuentModelsByService({ page, size: paginate.perPage });
      setFrecuentModelsByService(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.perPage]);

  useEffect(() => {
    fetchFrecuentModelsByService();
  }, [fetchFrecuentModelsByService]);

  return { frecuentModelsByService, paginate, setPage };
}
