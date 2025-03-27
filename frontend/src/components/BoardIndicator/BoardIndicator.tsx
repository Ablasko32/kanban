import { PiKanban } from "react-icons/pi";
import styles from "./boardindicator.module.css";
import { HiOutlineClock } from "react-icons/hi";

const BoardIndicator = () => {
  const tempDate = new Date().toLocaleDateString();

  return (
    <div className={styles.boardIndicatorContainer}>
      <div className={`${styles.indicatorItem} ${styles.boardName}`}>
        <PiKanban />
        Test project
      </div>
      <div className={`${styles.indicatorItem} ${styles.boardCreatedAt}`}>
        <HiOutlineClock />
        {tempDate}
      </div>
    </div>
  );
};

export default BoardIndicator;
