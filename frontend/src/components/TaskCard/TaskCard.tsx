import { useDrag } from "react-dnd";
import { TaskData } from "../../stores/taskStore";
import styles from "./taskCard.module.css";
import TextExpander from "../TextExpander/TextExpander";
import {
  HiArrowCircleRight,
  HiFire,
  HiOutlineCalendar,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import Tooltip from "../Tooltip/Tooltip";
import { Link } from "react-router-dom";

const TaskCard = ({ task }: { task: TaskData }) => {
  // Style based on task status
  const cardStyles = {
    done: styles.done,
    inProgress: styles.inProgress,
    open: styles.open,
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const fireNumber: Record<"high" | "med" | "low", number> = {
    high: 3,
    med: 2,
    low: 1,
  };

  return (
    <li
      style={{
        opacity: isDragging ? "0.5" : "1",
        cursor: isDragging ? "move" : "auto",
      }}
      ref={drag}
      className={`${styles.card} `}
    >
      <h4 className={styles.cardTitle}>{task.name}</h4>
      <div className={`${cardStyles[task.status]}`}></div>
      <TextExpander
        classNameText={styles.cardDescription}
        classNameButton={styles.cardShowMore}
        text={task.description}
      />

      <p className={styles.priority}>
        <Tooltip text="Task priority">
          {[...Array(fireNumber[task.priority])].map((el) => {
            return <HiFire key={el} />;
          })}
        </Tooltip>
      </p>

      {/* dates */}
      <div className={styles.dateContainer}>
        <Tooltip text="Date task was created">
          <div>
            <label className={styles.dateLabel} htmlFor="staredDate">
              Started
            </label>
            <p id="staredDate" className={styles.dateStarted}>
              <HiOutlineCalendar /> {task.createdAt.toLocaleDateString()}
            </p>
          </div>
        </Tooltip>
        <Tooltip text="Date when task is due">
          <div>
            <label className={styles.dateLabel} htmlFor="staredDate">
              Due
            </label>
            <p id="staredDate" className={styles.dateStarted}>
              <HiOutlineCalendar /> {task.createdAt.toLocaleDateString()}
            </p>
          </div>
        </Tooltip>
      </div>

      <button className={styles.openTask}>
        <Tooltip text="Open task details">
          <Link to={`/task/${task.id}`}>
            <HiOutlineChevronDoubleRight />
          </Link>
        </Tooltip>
      </button>
    </li>
  );
};

export default TaskCard;
