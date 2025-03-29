import { NotificationStore } from "./notificationStore";
import { TaskStore } from "./taskStore";
import { TimerStore } from "./timerStore";

export class RootStore {
  taskStore: TaskStore;
  timerStore: TimerStore;
  notificationStore: NotificationStore;

  constructor() {
    this.taskStore = new TaskStore();
    this.timerStore = new TimerStore();
    this.notificationStore = new NotificationStore();
  }
}
