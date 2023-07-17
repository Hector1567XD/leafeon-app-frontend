import { RecommendedService, InputRecommendedService } from "../../types";
import { LocalRecommendedService } from "../types";

type LocalRecommendedServiceType = LocalRecommendedService | InputRecommendedService | RecommendedService;

export default function convertLocalToRecommendedServicesInput(
  modelId: string, services: LocalRecommendedServiceType[]
): InputRecommendedService[] {
  return services.map(
    (service: LocalRecommendedServiceType) =>
      convertLocalToRecommendedServiceInput(modelId, service)
  );
}

export function convertLocalToRecommendedServiceInput(
  modelId: string, service: LocalRecommendedServiceType
): InputRecommendedService {
  return ({
    serviceId: +service.serviceId,
    mileage: +service.mileage,
    useTime: +service.useTime,
    modelId,
  });
}
