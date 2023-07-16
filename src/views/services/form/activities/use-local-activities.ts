import { useCallback, useEffect, useState } from "react";
import { ActivityFormValues } from "./form";
import { Activity } from "core/activities/types";
import { ActivityLocal } from "../types";

const useLocalActivities = (inputActivities: Activity[], onChange: (activities: ActivityLocal[]) => void) => {
  const [localActivities, setLocalActivities] = useState<ActivityLocal[]>(inputActivities);

  useEffect(() => {
    setLocalActivities(inputActivities);
  }, [inputActivities]);

  useEffect(() => {
    onChange(localActivities);
  }, [localActivities, onChange]);

  const onDelete = useCallback((activity: ActivityLocal, index: number) => {
    if (activity.activityId) {
      setLocalActivities((prev) => {
        const newActivities = [...prev];
        newActivities[index].localDeleted = true;
        return newActivities;
      });
    } else {
      setLocalActivities((prev) => {
        const newActivities = [...prev];
        newActivities.splice(index, 1);
        return newActivities;
      });
    }
  }, []);

  const onUpdate = useCallback((activity: ActivityLocal, formValues: ActivityFormValues, index: number) => {
    if (activity.activityId) {
      const onlineState = (activity.onlineState ? activity.onlineState : activity) as Activity;
      setLocalActivities((prev) => {
        const newActivities = [...prev];
        newActivities[index] = {
          ...activity,
          ...formValues,
          onlineState,
        };
        return newActivities;
      });
    } else {
      setLocalActivities((prev) => {
          const newActivities = [...prev];
          newActivities[index] = {
            ...activity,
            ...formValues,
          };
          return newActivities;
      });
    }
  }, []);

  const onCreate = useCallback((formValues: ActivityFormValues) => {
    setLocalActivities((prev) => {
      const newActivities = [...prev] as ActivityLocal[];
      newActivities.push({
        ...formValues,
        activityId: null,
      } as unknown as ActivityLocal);
      return newActivities;
    });
  }, []);

  const onRevertDelete = useCallback((_: ActivityLocal, index: number) => {
    setLocalActivities((prev) => {
      const newActivities = [...prev];
      newActivities[index].localDeleted = false;
      return newActivities;
    });
  }, []);

  return { localActivities, onRevertDelete, onDelete, onUpdate, onCreate };
};

export default useLocalActivities;
