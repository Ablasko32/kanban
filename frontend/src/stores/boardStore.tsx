import { action, makeObservable, observable, runInAction } from "mobx";
import { ApiClient } from "../core/ApiClient";

export class BoardStore {
  allBoards = [];
  apiClient = new ApiClient();
  isFetching = false;
  openBoard: Record<any, any> = {};

  constructor() {
    makeObservable(this, {
      allBoards: observable,
      isFetching: observable,
      fetchAllBoards: action,
      openBoard: observable,
    });
  }

  async fetchAllBoards() {
    runInAction(() => {
      this.isFetching = true;
    });

    const boards = await this.apiClient.get("boards/all");

    runInAction(() => {
      this.allBoards = boards.data;
      this.isFetching = false;
    });
  }

  async deleteBoard(boardId: number) {
    runInAction(() => {
      this.isFetching = true;
    });

    await this.apiClient.delete("boards/delete", boardId);
    await this.fetchAllBoards();
    runInAction(() => {
      this.isFetching = false;
    });
  }

  async addBoard(body: { name: string }) {
    runInAction(() => {
      this.isFetching = true;
    });

    await this.apiClient.post("boards/add", body);
    await this.fetchAllBoards();
    runInAction(() => {
      this.isFetching = false;
    });
  }

  async fetchBoardForBoardId(id: string) {
    const data = await this.apiClient.get(`boards/${id}`);
    runInAction(() => {
      this.openBoard = data.data[0];
    });
  }
}
