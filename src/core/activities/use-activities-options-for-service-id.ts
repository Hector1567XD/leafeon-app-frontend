import { SelectOption } from "components/SelectField";
import useServiceById from "views/services/edit/use-service-by-id";

export default function useActivitiesOptionsForServiceId(serviceId: number | null): SelectOption[] {
  const service = useServiceById(serviceId);
  const items = service?.activities || [];
  
  return items.map((item) => ({
    label: item.description,
    value: item.activityId,
  }));
}
