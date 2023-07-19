import { useCallback, useEffect, useState } from "react";
// Own
import { useAppDispatch } from "store";
import { PaginateData } from "services/types";
import BackendError from "exceptions/backend-error";
import getFakeClients from "services/stadistics/get-fake-clients";
import { FakeClientsItem } from "services/stadistics/types";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [fakeClients, setFakeClients] = useState<FakeClientsItem[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    total: 0,
    page: 1,
    perPage: 5,
    pages: 0,
  });

  const fetchFakeClients = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getFakeClients({ page, size: paginate.perPage });
      setFakeClients(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.perPage]);

  useEffect(() => {
    fetchFakeClients();
  }, [fetchFakeClients]);

  return { fakeClients, paginate, setPage };
}
