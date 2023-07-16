import { FunctionComponent, useCallback } from "react";
import { styled } from "styled-components";
import ActivitiesCrud from "./activities-crud";
import { Activity, InputActivity } from "core/activities/types";
import { ActivityLocal, ChangeEventActivities } from "../types";
import { FormControl, FormHelperText } from "@mui/material";
import useLocalActivities from "./use-local-activities";
import convertActivitiesToActivityInput from "../convert-activities-to-input-activities";

const createChangeEventActivities = (fieldName: string, activities: InputActivity[]): ChangeEventActivities => {
  return {
    target: {
      name: fieldName,
      id: fieldName,
      value: activities,
    },
  } as unknown as ChangeEventActivities
}

const ActivitiesCrudWrapper: FunctionComponent<Props> = (
  {
    className,
    inputActivities,
    onChange,
    onHandleFormChange,
    fieldName,
    error,
    helperText,
    serviceId
  }
) => {
  //const isCreated = !isUpdate;
  const onChangeLocalActivities = useCallback(
    (activities: ActivityLocal[]) => {
      onChange?.(activities);

      const activitiesToServer = convertActivitiesToActivityInput(serviceId, activities);

      const changeEventActivities = createChangeEventActivities(fieldName, activitiesToServer);
      onHandleFormChange(changeEventActivities);
    }, [fieldName, onChange, onHandleFormChange, serviceId]
  );

  const { localActivities, onDelete, onUpdate, onCreate, onRevertDelete }
    = useLocalActivities(inputActivities, onChangeLocalActivities);

  return (
    <FormControl error={error} fullWidth>
      <ActivitiesCrud
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCreate={onCreate}
        onRevertDelete={onRevertDelete}
        items={localActivities}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

interface Props {
  helperText?: string;
  error?: boolean;
  fieldName: string;
  className?: string;
  inputActivities: Activity[];
  onChange?: (activities: ActivityLocal[]) => void;
  onHandleFormChange: (activities: ChangeEventActivities) => void;
  serviceId: number | null;
}

export default styled(ActivitiesCrudWrapper)``;
