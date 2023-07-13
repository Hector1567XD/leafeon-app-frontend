import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useClientDni() {
  const navigate = useNavigate();
  const params = useParams();

  const [clientDni, setClientDni] = useState<string | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/clients');
    }

    setClientDni(params.id as unknown as string);
  }, [navigate, params.id]);

  return clientDni;
}