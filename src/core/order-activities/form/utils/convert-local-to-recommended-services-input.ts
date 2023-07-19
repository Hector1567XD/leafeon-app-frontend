import { OrderActivity, InputOrderActivity } from "../../types";
import { LocalOrderActivity } from "../types";

type LocalOrderActivityType = LocalOrderActivity | InputOrderActivity | OrderActivity;

export default function convertLocalToOrderActivitysInput(
  orderId: number, activities: LocalOrderActivityType[]
): InputOrderActivity[] {
  return activities.map(
    (orderActivity: LocalOrderActivityType) =>
      convertLocalToOrderActivityInput(orderId, orderActivity)
  );
}

export function convertLocalToOrderActivityInput(
  orderId: number, orderActivity: LocalOrderActivityType
): InputOrderActivity {
  return ({
    serviceId: +orderActivity.serviceId,
    activityId: +orderActivity.activityId,
    employeeDni: orderActivity.employeeDni,
    hoursTaken: +orderActivity.hoursTaken,
    orderId,
  });
}
