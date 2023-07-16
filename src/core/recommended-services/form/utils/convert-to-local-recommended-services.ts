import { RecommendedService, InputRecommendedService } from "../../types";
import { LocalRecommendedService } from "../types";

type RecommendedServiceType = LocalRecommendedService | InputRecommendedService | RecommendedService;

export default function convertToLocalRecommendedServices(
  services: RecommendedServiceType[]
): LocalRecommendedService[] {
  return services.map(
        (service: RecommendedServiceType) => ({
          serviceId: +service.serviceId,
          mileage: +service.mileage,
          useTime: +service.useTime,
        })
  );
}
