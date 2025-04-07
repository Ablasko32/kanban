import { action, makeObservable, observable, runInAction } from "mobx";
import { ApiClient } from "../core/ApiClient";
import { RootStore } from "./rootStore";

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
  @observable boardList = [];
  @observable selectedBoardId: string = "";

  constructor(public rootStore: RootStore) {
    makeObservable(this);
    this.apiClient = new ApiClient();
  }

  @action.bound
  async getDashboardData(filter = "all") {
    runInAction(() => {
      this.isFetching = true;
    });
    await this.rootStore.boardStore.fetchAllBoards();
    const data = await this.apiClient.get(`stats/dashboard?board=${filter}`);

    runInAction(() => {
      this.dashboardData = data.data;
      this.isFetching = false;
    });
  }

  @action.bound
  async handleBoardChange(boardId: string) {
    runInAction(() => {
      this.selectedBoardId = boardId;
    });
    this.getDashboardData(boardId);
  }
}
