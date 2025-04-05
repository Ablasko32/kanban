import { BoardStore } from "./boardStore";
import { NotificationStore } from "./notificationStore";
import { TaskStore } from "./taskStore";
import { TimerStore } from "./timerStore";

export class RootStore {
  taskStore: TaskStore;
  timerStore: TimerStore;
  notificationStore: NotificationStore;
  boardStore: BoardStore;

  constructor() {
    this.taskStore = new TaskStore();
    this.timerStore = new TimerStore();
    this.notificationStore = new NotificationStore();
    this.boardStore = new BoardStore();
  }
}
