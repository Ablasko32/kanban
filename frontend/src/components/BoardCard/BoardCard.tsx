import { Link } from "react-router-dom";
import styles from "./boardcard.module.css";
import Tooltip from "../Tooltip/Tooltip";
import {
  HiOutlineCalendar,
  HiOutlineChevronDoubleRight,
  HiOutlineTrash,
} from "react-icons/hi";

const BoardCard = () => {
  return (
    <div className={styles.boardCard}>
      <h4>New board</h4>
      <p>
        <Tooltip text="Date when board was created">
          <HiOutlineCalendar />
          {new Date().toLocaleDateString()}
        </Tooltip>
      </p>
      <button className={styles.openBoard}>
        <Tooltip text="Open board">
          <Link to={`/board/12344`}>
            <HiOutlineChevronDoubleRight />
          </Link>
        </Tooltip>
      </button>
      <button onClick={() => alert("Board deleted")} className={styles.delete}>
        <Tooltip text="Delete board">
          <HiOutlineTrash />
        </Tooltip>
      </button>
    </div>
  );
};

export default BoardCard;
