import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import { Job } from 'core/jobs/types';
import getJob from 'services/jobs/get-job';

export default function useJobById(jobId: number | null) {
  const dispatch = useAppDispatch();
  const [job, setJob] = useState<Job | null>(null);

  const fetchJob = useCallback(async (jobId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getJob(jobId);
      setJob(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobId) fetchJob(jobId);
  }, [fetchJob, jobId]);

  return job;
};
