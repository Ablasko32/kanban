import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { ApiClient } from "../core/ApiClient";

export type TaskStatus = "open" | "progress" | "done";
export type TaskPriority = "low" | "med" | "high";

export interface TaskData {
  id?: number;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dateCreated: Date;
  boardId: string;
  dueDate?: Date;
  boardName?: string;
}

export interface TaskFileData {
  id?: number;
  name: string;
  dateCreated: Date;
  type: string;
  path: string;
  size: number;
  taskId: number;
}

export class TaskStore {
  @observable tasks: TaskData[] = [];
  @observable isFetching = false;
  @observable openTask: TaskData | {} = {};
  @observable taskFileData: TaskFileData[] = [];
  apiClient = new ApiClient();

  constructor() {
    makeObservable(this);
  }

  @computed
  get allDoneTasks() {
    return this.tasks.filter((task) => task.status === "done");
  }

  @computed
  get allOpenTasks() {
    return this.tasks.filter((task) => task.status === "open");
  }

  @computed
  get allProgressTasks() {
    return this.tasks.filter((task) => task.status === "progress");
  }

  @action
  async changeTaskStatus(
    taskId: string,
    taskStatus: TaskStatus,
    boardId: string
  ) {
    const body = {
      status: taskStatus,
    };

    await this.apiClient.put("tasks/update", taskId, body);
    await this.fetchAllTasksForBoardId(boardId);
  }

  @action.bound
  async retriveTaskByID(id: string) {
    const data = await this.apiClient.get(`tasks/${id}`);
    runInAction(() => {
      this.openTask = data.data[0];
    });
  }

  @action.bound
  async fetchAllTasksForBoardId(id: string) {
    runInAction(() => {
      this.isFetching = true;
    });
    const data = await this.apiClient.get(`tasks/all/${id}`);
    runInAction(() => {
      this.tasks = data.data;
      this.isFetching = false;
    });
  }

  @action.bound
  async addNewTaskToDb(task: TaskData) {
    await this.apiClient.post("tasks/add", task);
    await this.fetchAllTasksForBoardId(task.boardId);
  }

  @action.bound
  async deleteTaskById(id: string, boardId: string) {
    await this.apiClient.delete("tasks/delete", Number(id));
    await this.fetchAllTasksForBoardId(boardId);
  }

  @action.bound
  async getFilesForTaskId(id: string) {
    const data = await this.apiClient.get(`tasks/upload-file/${id}`);
    runInAction(() => {
      this.taskFileData = data.data;
    });
  }

  @action.bound
  async deleteTaskFilesById(fileId: string, taskId: strig) {
    await this.apiClient.delete("tasks/upload-file", Number(fileId));
    await this.getFilesForTaskId(taskId);
  }
}
