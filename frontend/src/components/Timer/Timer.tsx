import { useStoreProvider } from "../../stores/StoreProvider";
import { observer } from "mobx-react";
import styles from "./timer.module.css";
import { ChangeEvent } from "react";
import { IoPlayOutline, IoStopOutline } from "react-icons/io5";

export function formatTime(seconds: number) {
  seconds = Math.round(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

const Timer = observer(() => {
  const rootStore = useStoreProvider();

  const { timerStore, taskStore } = rootStore;

  const progressTasks = taskStore.allProgressTasks;

  function handleTimer() {
    timerStore.changeRunningState(timerStore.activeTask);
  }

  if (!progressTasks.length) return null;

  return (
    <div className={styles.container}>
      <p>Track your time</p>
      <select
        value={timerStore.activeTask}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          timerStore.setActiveTask(e.target.value)
        }
      >
        <option value={""}>Select task</option>
        {progressTasks.map((task) => {
          return (
            <option value={task.id} key={task.id}>
              {task.name}
            </option>
          );
        })}
      </select>
      {timerStore.activeTask && (
        <div className={styles.timer}>
          <button onClick={handleTimer}>
            {timerStore.isRunning ? <IoStopOutline /> : <IoPlayOutline />}
          </button>
          <p>{formatTime(timerStore.time)}</p>
        </div>
      )}
    </div>
  );
});

export default Timer;
