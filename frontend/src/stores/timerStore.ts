import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { ApiClient } from "../core/ApiClient";

interface TaskTimers {
  id?: number;
  startTime: Date;
  endTime: Date;
}

export class TimerStore {
  @observable isRunning: boolean = false;
  @observable time: number = 0;
  @observable activeTask: string = "";
  interval: NodeJS.Timeout | null = null;
  @observable currentTimer: string = "";
  @observable currentTaskTimers: TaskTimers[] = [];
  @observable isFetchingTimers = false;

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

  @action.bound
  async getAllTimersForTaskId(taskId: string) {
    runInAction(() => {
      this.currentTaskTimers = [];
      this.isFetchingTimers = true;
    });
    const data = await this.apiClient.get(`timer/task/${taskId}`);
    runInAction(() => {
      this.currentTaskTimers = data.data;
      this.isFetchingTimers = false;
    });
  }

  @computed
  get totalTimeForTaskComputed() {
    return this.currentTaskTimers.reduce((total, timer) => {
      const startTime = new Date(timer.startTime).getTime();
      const endTime = new Date(timer.endTime).getTime();

      const duration = (endTime - startTime) / 1000;
      return total + duration;
    }, 0);
  }
}
