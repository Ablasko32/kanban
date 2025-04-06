import { action, makeObservable, observable, runInAction } from "mobx";
import { ApiClient } from "../core/ApiClient";

export class TimerStore {
  @observable isRunning: boolean = false;
  @observable time: number = 0;
  @observable activeTask: string = "";
  interval: NodeJS.Timeout | null = null;
  @observable currentTimer: string = "";

  apiClient = new ApiClient();

  constructor() {
    makeObservable(this);
  }

  @action
  incrementTime() {
    this.time += 1;
  }

  @action
  async changeRunningState(taskId: string) {
    // stopping timer
    if (this.isRunning) {
      this.isRunning = false;
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      await this.apiClient.put(`timer/task/end`, this.currentTimer, {});
      this.resetTimer();

      // Starting timer
    } else {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.incrementTime();
      }, 1000);
      const data = await this.apiClient.post(`timer/task/${taskId}/start`, {});
      runInAction(() => {
        this.currentTimer = data.data[0].id;
      });
    }
  }

  @action
  resetTimer() {
    this.isRunning = false;
    this.time = 0;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.activeTask = "";
    this.currentTimer = "";
  }

  @action.bound
  setActiveTask(id: string) {
    this.activeTask = id;
  }
}
