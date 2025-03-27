import { TaskStore } from "./taskStore";
import { TimerStore } from "./timerStore";

export class RootStore {
  taskStore: TaskStore;
  timerStore: TimerStore;

  constructor() {
    this.taskStore = new TaskStore();
    this.timerStore = new TimerStore();
  }
}
