import { action, makeObservable, observable, runInAction } from "mobx";
import { ApiClient } from "../core/ApiClient";

interface TaskStatusData {
  open: number;
  total: number;
  done: number;
  progress: number;
}

interface DashboardData {
  taskStatusData: TaskStatusData;
}

export class DashboardStore {
  apiClient: ApiClient;
  @observable isFetching = false;
  @observable dashboardData: DashboardData | {} = {};

  constructor() {
    makeObservable(this);
    this.apiClient = new ApiClient();
  }

  @action.bound
  async getDashboardData() {
    runInAction(() => {
      this.isFetching = true;
    });
    const data = await this.apiClient.get("stats/dashboard");
    runInAction(() => {
      this.dashboardData = data.data;
      this.isFetching = false;
    });
  }
}
