import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useModelId() {
  const navigate = useNavigate();
  const params = useParams();

  const [modelId, setModelId] = useState<string | null>(null);
  useEffect(() => {
    if (!params.id) {
      navigate('/models');
    }

    setModelId(params.id as unknown as string);
  }, [navigate, params.id]);

  return modelId;
}
