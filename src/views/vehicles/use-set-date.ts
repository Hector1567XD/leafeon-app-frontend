import { useFormikContext } from "formik";
import { Dayjs } from "dayjs";

export default function useSetDate() {
  const { setFieldValue } = useFormikContext();

  function setDate(date: Dayjs | null) {
    setFieldValue("saleDate", date);
  }

  return setDate;
}