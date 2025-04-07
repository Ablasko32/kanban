import { BoardStore } from "./boardStore";
import { DashboardStore } from "./dashboardStore";
import { NotificationStore } from "./notificationStore";
import { TaskStore } from "./taskStore";
import { TimerStore } from "./timerStore";

export class RootStore {
  taskStore: TaskStore;
  timerStore: TimerStore;
  notificationStore: NotificationStore;
  boardStore: BoardStore;
  dashboardStore: DashboardStore;

  constructor() {
    this.taskStore = new TaskStore();
    this.timerStore = new TimerStore();
    this.notificationStore = new NotificationStore();
    this.boardStore = new BoardStore();
    this.dashboardStore = new DashboardStore(this);
  }
}
