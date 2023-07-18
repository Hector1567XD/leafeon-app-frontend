import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useBankCardId() {
  const navigate = useNavigate();
  const params = useParams();

  const [cardNumber, setCardNumber] = useState<string | null>(null);
  useEffect(() => {
    if (!params.id) {
      navigate('/bankCards');
    }

    setCardNumber(params.id as unknown as string);
  }, [navigate, params.id]);

  return cardNumber;
}