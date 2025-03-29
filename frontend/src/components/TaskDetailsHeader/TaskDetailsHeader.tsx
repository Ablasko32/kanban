import { PiKanban } from "react-icons/pi";
import styles from "./taskdetailsheader.module.css";
import { HiOutlineChevronDoubleLeft, HiOutlineClock } from "react-icons/hi";
import Tooltip from "../Tooltip/Tooltip";
import { TaskData } from "../../stores/taskStore";
import { useNavigate } from "react-router-dom";

const TaskDetailsHeader = ({ taskData }: { taskData: TaskData }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className={styles.taskIndicatorContainer}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <HiOutlineChevronDoubleLeft />
        </button>
        <div className={`${styles.indicatorItem} ${styles.boardName}`}>
          <PiKanban />
          Test project
        </div>
        <Tooltip text="Date when task was created">
          <div className={`${styles.indicatorItem} ${styles.taskCreatedAt}`}>
            <HiOutlineClock />
            {taskData.createdAt.toLocaleDateString()}
          </div>
        </Tooltip>
        <Tooltip text="Date when task is due">
          <div className={`${styles.indicatorItem} ${styles.taskDueDate}`}>
            <HiOutlineClock />
            {taskData.createdAt.toLocaleDateString()}
            {/* this is to change after we have this */}
          </div>
        </Tooltip>
      </div>
    </header>
  );
};

export default TaskDetailsHeader;
