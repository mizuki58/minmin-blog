import { format, parseISO } from "date-fns";

export const formatDate = (dateString: string | undefined): string => {
  return dateString ? format(parseISO(dateString), "MMMM dd, yyyy") : "";
};
