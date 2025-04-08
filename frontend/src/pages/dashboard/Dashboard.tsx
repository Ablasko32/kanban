import styles from "./dashboard.module.css";

import DashboardTaskStats from "../../components/DashboardTaskStats/DashboardTaskStats";
import { ChangeEvent, useEffect } from "react";
import { observer } from "mobx-react";
import { useStoreProvider } from "../../stores/StoreProvider";
import Spinner from "../../components/Spinner/Spinner";
import { Board } from "../../components/BoardCard/BoardCard";
import DashboardTimeStats from "../../components/DashboardTimeStats/DashboardTimeStats";

const Dashboard = observer(() => {
  const { dashboardStore, boardStore } = useStoreProvider();

  useEffect(() => {
    dashboardStore.getDashboardData();
  }, [dashboardStore]);

  console.log(dashboardStore.dashboardData.taskStatusData);

  if (dashboardStore.isFetching) return <Spinner />;

  return (
    <div className={styles.container}>
      <select
        className={styles.boardFilter}
        value={dashboardStore.selectedBoardId}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          dashboardStore.handleBoardChange(e.target.value)
        }
      >
        <option value="all">All</option>
        {boardStore.allBoards.map((board: Board) => {
          return (
            <option key={board.id} value={board.id}>
              {board.boardName}
            </option>
          );
        })}
      </select>
      <DashboardTaskStats stats={dashboardStore.dashboardData.taskStatusData} />
      <DashboardTimeStats stats={dashboardStore.dashboardData.taskTimeData} />
    </div>
  );
});

export default Dashboard;
