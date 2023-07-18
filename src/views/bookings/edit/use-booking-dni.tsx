import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function useBookingIdooking() {
  const navigate = useNavigate();
  const params = useParams();

  const [bookingId, setBookingId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/bookings');
    }

    setBookingId(params.id as unknown as number);
  }, [navigate, params.id]);

  return bookingId;
}