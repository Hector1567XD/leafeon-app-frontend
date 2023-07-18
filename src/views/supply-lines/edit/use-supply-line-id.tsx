import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useSupplyLineId() {
  const navigate = useNavigate();
  const params = useParams();

  const [supplyLineId, setSupplyLineId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate("/supply-lines");
    }

    setSupplyLineId(params.id as unknown as number);
  }, [navigate, params.id]);

  return supplyLineId;
}
