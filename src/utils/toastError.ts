import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export function toastError(error: unknown) {
  console.error(error);
  if (error instanceof AxiosError) {
    if (error.response?.data?.message)
      toast.error(error.response?.data.message);
    else if (error.response?.status === 401)
      toast.error("Invalid ID or Password");
    else toast.error(error.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("unknown error");
  }
}
