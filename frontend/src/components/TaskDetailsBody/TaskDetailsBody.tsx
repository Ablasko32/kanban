import { HiFire } from "react-icons/hi";
import { TaskData } from "../../stores/taskStore";
import Tooltip from "../Tooltip/Tooltip";
import styles from "./taskdetailsbody.module.css";

const TaskDetailsBody = ({ taskData }: { taskData: TaskData }) => {
  const statusStyles = {
    open: styles.openStatus,
    progress: styles.progressStatus,
    done: styles.doneStatus,
  };

  const fireNumber: Record<"high" | "med" | "low", number> = {
    high: 3,
    med: 2,
    low: 1,
  };

  return (
    <div className={styles.detailsBox}>
      <h4 className={styles.taskName}>
        {taskData.name}
        <Tooltip text="Task status">
          <span className={statusStyles[taskData.status]}>
            {taskData.status}
          </span>
        </Tooltip>
      </h4>
      <p className={styles.priority}>
        <Tooltip text="Task priority">
          {[...Array(fireNumber[taskData.priority])].map((el, idx) => {
            return <HiFire key={idx} />;
          })}
        </Tooltip>
      </p>
      <p className={styles.taskDescription}>{taskData.description}</p>
    </div>
  );
};

export default TaskDetailsBody;
