import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useAgencyRif() {
  const navigate = useNavigate();
  const params = useParams();

  const [agencyRif, setAgencyRif] = useState<string | null>(null);
  useEffect(() => {
    if (!params.id) {
      navigate('/agencies');
    }

    setAgencyRif(params.id as unknown as string);
  }, [navigate, params.id]);

  return agencyRif;
}
