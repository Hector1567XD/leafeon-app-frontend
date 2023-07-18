import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function usePaymentId() {
  const navigate = useNavigate();
  const params = useParams();

  const [billId, setBillId] = useState<number | null>(null);
  const [paymentId, setPaymentId] = useState<number | null>(null);

  useEffect(() => {
    if (!params.billId || !params.paymentId) {
      navigate("/payments");
    }

    setBillId(params.billId as unknown as number);
    setPaymentId(params.paymentId as unknown as number);
  }, [navigate, params.billId, params.paymentId]);

  return { billId, paymentId };
}
