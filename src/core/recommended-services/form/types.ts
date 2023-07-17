import { ChangeEvent } from "react";
import { InputRecommendedService } from "../types";

export type LocalRecommendedService = Omit<InputRecommendedService, 'modelId'>;

export type ChangeEventRecommendedServices = ChangeEvent<{ value: InputRecommendedService[] }>;
