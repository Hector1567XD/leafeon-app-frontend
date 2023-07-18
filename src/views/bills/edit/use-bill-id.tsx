import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useBillId() {
  const navigate = useNavigate();
  const params = useParams();

  const [billId, setBillId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate("/bills");
    }

    setBillId(params.id as unknown as number);
  }, [navigate, params.id]);

  return billId;
}
