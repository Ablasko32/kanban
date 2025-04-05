import { useEffect } from "react";
import BoardCard from "../../components/BoardCard/BoardCard";
import styles from "./myboards.module.css";
import { useStoreProvider } from "../../stores/StoreProvider";
import { observer } from "mobx-react";

const CreateBoard = observer(() => {
  const rootStore = useStoreProvider();

  useEffect(() => {
    rootStore.boardStore.fetchAllBoards();
  }, [rootStore.boardStore]);

  if (rootStore.boardStore.isFetching) return <div>Loading...</div>;

  return (
    <div>
      <h1 className={styles.boardTitle}>My boards</h1>
      {rootStore.boardStore.allBoards.length ? (
        <div className={styles.boardsContainer}>
          {rootStore.boardStore.allBoards.map((board) => {
            return <BoardCard board={board} key={board.id} />;
          })}
        </div>
      ) : (
        <p className={styles.emptyState}>No boards yet</p>
      )}
    </div>
  );
});

export default CreateBoard;
