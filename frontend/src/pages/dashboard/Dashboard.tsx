import styles from "./dashboard.module.css";

import DashboardTaskStats from "../../components/DashboardTaskStats/DashboardTaskStats";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { useStoreProvider } from "../../stores/StoreProvider";
import Spinner from "../../components/Spinner/Spinner";

const Dashboard = observer(() => {
  const { dashboardStore } = useStoreProvider();

  useEffect(() => {
    dashboardStore.getDashboardData();
  }, [dashboardStore]);

  console.log(dashboardStore.dashboardData.taskStatusData);

  if (dashboardStore.isFetching) return <Spinner />;
  return (
    <div className={styles.container}>
      <DashboardTaskStats
        stats={dashboardStore.dashboardData?.taskStatusData}
      />
    </div>
  );
});

export default Dashboard;
