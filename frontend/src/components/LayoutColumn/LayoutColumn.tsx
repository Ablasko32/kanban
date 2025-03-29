import React, { useRef } from "react";
import { TaskData } from "../../stores/taskStore";
import TaskCard from "../TaskCard/TaskCard";
import Tooltip from "../Tooltip/Tooltip";
import styles from "./layoutcolumn.module.css";
import { RootStore } from "../../stores/rootStore";
import { HiOutlineInformationCircle, HiPlusCircle } from "react-icons/hi";
import { observer } from "mobx-react";
import Modal from "../Modal/Modal";
import { CreateTaskForm } from "./CreateTaskForm";

type RenderType = "progress" | "done" | "open";

const LayoutColumn = observer(
  ({
    reference,
    rootStore,
    type,
    title,
  }: {
    reference: React.RefObject<HTMLDivElement>;
    rootStore: RootStore;
    type: RenderType;
    title: string;
  }) => {
    const RenderTypes: Record<RenderType, any> = {
      progress: rootStore.taskStore.allProgressTasks,
      done: rootStore.taskStore.allDoneTasks,
      open: rootStore.taskStore.allOpenTasks,
    };

    const formInstance = useRef(new CreateTaskForm(rootStore));

    const createTaskForm = formInstance.current;

    createTaskForm.$("type").set(type);

    return (
      <div ref={reference} className={styles.inProgressTasks}>
        <div className={styles.titleBox}>
          <div className={styles.title}>
            {" "}
            <h2>{title}</h2>
            <Tooltip text="Tasks currently in progress">
              <HiOutlineInformationCircle />
            </Tooltip>
          </div>

          <Modal
            trigger={
              <button className={styles.addButton}>
                Add task
                <Tooltip text="Add new task">
                  <HiPlusCircle />
                </Tooltip>
              </button>
            }
          >
            <div>
              <h3>Create a new task</h3>
              <form
                onSubmit={createTaskForm.onSubmit}
                className={styles.taskForm}
              >
                <input {...createTaskForm.$("type").bind()} />

                <input {...createTaskForm.$("taskTitle").bind()} />
                {createTaskForm.$("taskTitle").error && (
                  <p className={styles.formError}>
                    {createTaskForm.$("taskTitle").error}
                  </p>
                )}
                <input {...createTaskForm.$("taskDescription").bind()} />
                {createTaskForm.$("taskDescription").error && (
                  <p className={styles.formError}>
                    {createTaskForm.$("taskDescription").error}
                  </p>
                )}
                <select {...createTaskForm.$("taskPriority").bind()}>
                  <option value="">Select Priority</option>
                  {createTaskForm.$("taskPriority").options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {createTaskForm.$("taskPriority").error && (
                  <p className={styles.formError}>
                    {createTaskForm.$("taskPriority").error}
                  </p>
                )}
                <button className={styles.submitButton}>Add</button>
              </form>
            </div>
          </Modal>
        </div>

        <ul className={styles.allTaskList}>
          {RenderTypes[type].map((task: TaskData) => {
            return <TaskCard task={task} key={task.id} />;
          })}
        </ul>
      </div>
    );
  }
);

export default LayoutColumn;
