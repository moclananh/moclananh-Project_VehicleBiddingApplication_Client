import { GlobalFilter } from "../constants/ui";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
export const calculateTotalPage = (totalItems: number = GlobalFilter.DEFAULT_TOTAL_ITEM, pageSize: number = GlobalFilter.DEFAULT_PAGE_SIZE) => {
  return Math.ceil(totalItems / pageSize);
};
export const timeLeft = (startTime: string, endTime: string): string => {
  const now = dayjs();
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  if (end.isBefore(now)) {
    return "Closed";
  }

  const referenceTime = now.isBefore(start) ? start : now;
  const diff = end.diff(referenceTime);

  const diffDuration = dayjs.duration(diff);

  const days = Math.floor(diffDuration.asDays());
  const hours = diffDuration.hours();
  const minutes = diffDuration.minutes();

  return `${days}d ${hours}h ${minutes}m left`;
};
