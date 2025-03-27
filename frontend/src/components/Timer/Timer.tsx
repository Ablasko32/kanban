import { useStoreProvider } from "../../stores/StoreProvider";
import { observer } from "mobx-react";
import styles from "./timer.module.css";

function formatTime(seconds: number) {
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

  const { timerStore } = rootStore;

  function handleTimer() {
    timerStore.changeRunningState();
  }

  function handleReset() {
    timerStore.resetTimer();
  }

  return (
    <div>
      <div className={styles.timer}>
        <button onClick={handleTimer}>
          {timerStore.isRunning ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-player-stop"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 5m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-player-play"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 4v16l13 -8z" />
            </svg>
          )}
        </button>
        <p>{formatTime(timerStore.time)}</p>
      </div>
      <div style={{ height: "2rem", textAlign: "center" }}>
        {timerStore.time !== 0 && <button onClick={handleReset}>Reset</button>}
      </div>
    </div>
  );
});

export default Timer;
