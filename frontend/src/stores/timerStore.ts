import { action, makeObservable, observable } from "mobx";

export class TimerStore {
  @observable isRunning: boolean = false;
  @observable time: number = 0;
  interval: NodeJS.Timeout | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  incrementTime() {
    this.time += 1;
  }

  @action
  changeRunningState() {
    if (this.isRunning) {
      this.isRunning = false;
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    } else {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.incrementTime();
      }, 1000);
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
  }
}
