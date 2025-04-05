import { PiKanban } from "react-icons/pi";
import styles from "./boardindicator.module.css";
import { HiOutlineClock } from "react-icons/hi";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStoreProvider } from "../../stores/StoreProvider";
import { useNavigate } from "react-router-dom";

const BoardIndicator = observer(({ id }: { id: string }) => {
  const rootStore = useStoreProvider();

  const navigate = useNavigate();

  useEffect(() => {
    rootStore.boardStore.fetchBoardForBoardId(id);
  }, [id, rootStore.boardStore]);

  // check here and navigate away if id is not good
  if (!rootStore.boardStore.openBoard) navigate("/");

  return (
    <div className={styles.boardIndicatorContainer}>
      <div className={`${styles.indicatorItem} ${styles.boardName}`}>
        <PiKanban />
        {rootStore.boardStore.openBoard.boardName}
      </div>
      <div className={`${styles.indicatorItem} ${styles.boardCreatedAt}`}>
        <HiOutlineClock />
        {new Date(
          rootStore.boardStore.openBoard.dateCreated
        ).toLocaleDateString()}
      </div>
    </div>
  );
});

export default BoardIndicator;
