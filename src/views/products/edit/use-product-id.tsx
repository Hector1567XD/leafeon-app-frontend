import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useProductId() {
  const navigate = useNavigate();
  const params = useParams();

  const [productId, setProductId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate("/products");
    }

    setProductId(params.id as unknown as number);
  }, [navigate, params.id]);

  return productId;
}
