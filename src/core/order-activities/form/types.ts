import { ChangeEvent } from "react";
import { InputOrderActivity } from "../types";

export type LocalOrderActivity = Omit<InputOrderActivity, 'orderId'>;

export type ChangeEventOrderActivities = ChangeEvent<{
  value: InputOrderActivity[]
}>;
