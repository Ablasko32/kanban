import Tooltip from "../Tooltip/Tooltip";
import { observer } from "mobx-react";
import styles from "./dashboardtimestats.module.css";
import { formatTime } from "../Timer/Timer";
import { IoIosTimer } from "react-icons/io";
import { PiTimer } from "react-icons/pi";

const DashboardTimeStats = observer(({ stats }) => {
  return (
    <div className={styles.taskStats}>
      <Tooltip text="Total time spent">
        <div className={styles.taskStatCard}>
          <PiTimer />
          <p>{formatTime(stats?.total)}</p>
        </div>
      </Tooltip>
      <Tooltip text="Average time per task">
        <div className={styles.taskStatCard}>
          <IoIosTimer />
          <p>{formatTime(stats?.average)}</p>
        </div>
      </Tooltip>
    </div>
  );
});
export default DashboardTimeStats;
