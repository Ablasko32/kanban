import { action, computed, makeObservable, observable } from "mobx";

export type TaskStatus = "open" | "inProgress" | "done";
export type TaskPriority = "low" | "med" | "high";

export interface TaskData {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
}

const placeholderData: TaskData[] = [
  {
    id: crypto.randomUUID(),
    name: "Creating list style dropdown",
    description:
      "Creating list style dropdown for list style dropdown etch etch etch i need to create drowpdpwn ",
    priority: "low",
    status: "open",
    createdAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Creating list style dropdown",
    description:
      "Creating list style dropdown for list style dropdown etch etch etch i need to create drowpdpwn ",
    priority: "med",
    status: "inProgress",
    createdAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Creating list style dropdown",
    description:
      "Creating list style dropdown for list style dropdown etch etch etch i need to create drowpdpwn ",
    priority: "high",
    status: "done",
    createdAt: new Date(),
  },
];

export class TaskStore {
  @observable tasks: TaskData[] = placeholderData;

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
    return this.tasks.filter((task) => task.status === "inProgress");
  }

  @action
  changeTaskStatus(taskId: string, taskStatus: TaskStatus) {
    const targetTask = this.tasks.find((task) => task.id === taskId);
    if (!targetTask) return;
    targetTask.status = taskStatus;
  }
}
