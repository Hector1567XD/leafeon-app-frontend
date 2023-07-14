import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useManagerDni() {
  const navigate = useNavigate();
  const params = useParams();

  const [managerDni, setManagerDni] = useState<string | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/managers');
    }

    setManagerDni(params.id as unknown as string);
  }, [navigate, params.id]);

  return managerDni;
}
