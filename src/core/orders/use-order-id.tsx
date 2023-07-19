import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useOrderId() {
  const navigate = useNavigate();
  const params = useParams();

  const [orderId, setOrderId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/orders');
    }

    setOrderId(params.id as unknown as number);
  }, [navigate, params.id]);

  return orderId;
}
