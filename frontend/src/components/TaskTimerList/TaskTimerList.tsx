import { observer } from "mobx-react";
import { useStoreProvider } from "../../stores/StoreProvider";
import styles from "./tasktimerlist.module.css";
import { formatTime } from "../Timer/Timer";
import Spinner from "../Spinner/Spinner";

const TaskTimerList = observer(() => {
  const rootStore = useStoreProvider();

  const { timerStore } = rootStore;

  if (!timerStore.currentTaskTimers.length) return null;

  if (timerStore.isFetchingTimers) return <Spinner type="tiny" />;

  return (
    <div className={styles.container}>
      <h5>
        Spent time - Total: {formatTime(timerStore.totalTimeForTaskComputed)}
      </h5>
      <ul className={styles.timerList}>
        <li className={styles.timerItem}>
          <p>Start time</p>
          <p>End time</p>
          <p>Duration</p>
        </li>

        {timerStore.currentTaskTimers.map((timer) => {
          const duration =
            (new Date(timer.endTime).getTime() -
              new Date(timer.startTime).getTime()) /
            1000;

          return (
            <li className={styles.timerItem} key={timer.id}>
              <p>{new Date(timer.startTime).toLocaleString()}</p>
              <p>{new Date(timer.endTime).toLocaleString()}</p>
              <p>{formatTime(duration)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default TaskTimerList;
