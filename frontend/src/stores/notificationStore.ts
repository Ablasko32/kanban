import { toast } from "react-toastify";

export class NotificationStore {
  sendError(message: string) {
    toast.error(message);
  }

  sendSucess(message: string) {
    toast.success(message);
  }
}
