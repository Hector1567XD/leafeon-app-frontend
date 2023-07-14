import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useJobId() {
  const navigate = useNavigate();
  const params = useParams();

  const [jobId, setJobId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/jobs');
    }

    setJobId(params.id as unknown as number);
  }, [navigate, params.id]);

  return jobId;
}