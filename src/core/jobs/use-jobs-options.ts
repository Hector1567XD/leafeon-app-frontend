import { SelectOption } from "components/SelectField";
import { Job } from "core/jobs/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllJobs from "services/jobs/get-all-jobs";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useJobsOptions(): SelectOption[] {
  const [jobs, setJobs] = useState<Job[]>([]);
  const dispatch = useAppDispatch();

  const fetchJobs = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllJobs();
      setJobs(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return jobs.map(job => ({
    label: job.description,
    value: job.jobId,
  }));
}
