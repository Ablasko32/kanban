import {
  TbProgressBolt,
  TbProgressCheck,
  TbProgressDown,
  TbSum,
} from "react-icons/tb";
import styles from "./dashboardtaskstats.module.css";
import Tooltip from "../../components/Tooltip/Tooltip";
import { observer } from "mobx-react";

const DashboardTaskStats = observer(({ stats }) => {
  return (
    <div className={styles.taskStats}>
      <Tooltip text="Total tasks">
        <div className={styles.taskStatCard}>
          <TbSum />
          <p>{stats?.total}</p>
        </div>
      </Tooltip>
      <Tooltip text="Total open tasks">
        <div className={styles.taskStatCard}>
          <TbProgressDown />
          <p>{stats?.open}</p>
        </div>
      </Tooltip>
      <Tooltip text="Total tasks in progress">
        <div className={styles.taskStatCard}>
          <TbProgressBolt />
          <p>{stats?.progress}</p>
        </div>
      </Tooltip>
      <Tooltip text="Total done tasks">
        <div className={styles.taskStatCard}>
          <TbProgressCheck />
          <p>{stats?.done}</p>
        </div>
      </Tooltip>
    </div>
  );
});

export default DashboardTaskStats;
