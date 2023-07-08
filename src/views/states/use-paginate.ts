// material-ui

import { useEffect, useState, useCallback } from 'react';
import getPaginate from 'services/states/get-paginate';
import { State } from 'core/states/types';
import { PaginateData } from 'services/types';
import BackendError from 'exceptions/backend-error';

export default function usePaginate() {
  const [items, setItems] = useState<State[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState<PaginateData>({
    total: 0,
    page: 1,
    perPage: 2,
    pages: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async (page?: number) => {
    try {
      setLoading(true);
      const response = await getPaginate({
        page: page || 1,
        size: paginate.perPage,
      });
      setItems(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError) setError(error.getMessage());
    } finally {
      setLoading(false)
    }
  }, [paginate.perPage]);

  useEffect(() => {
    fetchItems(page);
  }, [fetchItems, page]);

  return { items, page, loading, paginate, error, setPage, setError } as const;
}