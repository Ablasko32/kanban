import { PiKanban } from "react-icons/pi";
import styles from "./boardindicator.module.css";
import { HiOutlineClock } from "react-icons/hi";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStoreProvider } from "../../stores/StoreProvider";

const BoardIndicator = observer(({ id }: { id: string }) => {
  const rootStore = useStoreProvider();

  useEffect(() => {
    rootStore.boardStore.fetchBoardForBoardId(id);
  }, [id, rootStore.boardStore]);

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
