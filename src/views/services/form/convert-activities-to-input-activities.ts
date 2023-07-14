import { Activity, InputActivity } from "core/activities/types";
import { ActivityLocal } from "./types";

export default function convertActivitiesToActivityInput(
  serviceId: number | null, activities: Activity[] | ActivityLocal[]
): InputActivity[] {

  const activitiesWithLocalDeleted = activities
      .map((activity) => ({ ...activity, localDeleted: !!(activity as ActivityLocal).localDeleted }));

  const activitiesWithoutDeleteds = activitiesWithLocalDeleted.filter((activity) => !activity.localDeleted);
  
  return activitiesWithoutDeleteds.map(
        (localActivity: ActivityLocal) => ({
          activityId: localActivity.activityId ? +localActivity.activityId : null,
          description: localActivity.description,
          costHour: +localActivity.costHour,
          serviceId: serviceId ? +serviceId : null,
        })
  );
}