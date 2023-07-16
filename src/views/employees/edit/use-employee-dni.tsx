import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useEmployeeDni() {
  const navigate = useNavigate();
  const params = useParams();

  const [employeeDni, setEmployeeDni] = useState<string | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/employees');
    }

    setEmployeeDni(params.id as unknown as string);
  }, [navigate, params.id]);

  return employeeDni;
}