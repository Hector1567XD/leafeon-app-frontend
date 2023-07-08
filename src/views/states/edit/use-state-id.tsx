import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useStateId() {
  const navigate = useNavigate();
  const params = useParams();

  const [stateId, setStateId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/states');
    }

    setStateId(params.id as unknown as number);
  }, [navigate, params.id]);

  return stateId;
}

