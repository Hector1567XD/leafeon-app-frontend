import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useDiscountId() {
  const navigate = useNavigate();
  const params = useParams();

  const [discountId, setDiscountId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate("/discounts");
    }

    setDiscountId(params.id as unknown as number);
  }, [navigate, params.id]);

  return discountId;
}
