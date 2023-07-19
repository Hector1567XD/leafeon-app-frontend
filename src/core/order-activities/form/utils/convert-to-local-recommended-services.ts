import { OrderActivity, InputOrderActivity } from "../../types";
import { LocalOrderActivity } from "../types";

type OrderActivityType = LocalOrderActivity | InputOrderActivity | OrderActivity;

export default function convertToLocalOrderActivitys(
  activities: OrderActivityType[]
): LocalOrderActivity[] {
  return activities.map(
        (orderActivity: OrderActivityType) => ({
          serviceId: +orderActivity.serviceId,
          activityId: +orderActivity.activityId,
          employeeDni: orderActivity.employeeDni,
          hoursTaken: +orderActivity.hoursTaken,
        })
  );
}
