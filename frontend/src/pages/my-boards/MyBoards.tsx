import BoardCard from "../../components/BoardCard/BoardCard";
import styles from "./myboards.module.css";

const CreateBoard = () => {
  return (
    <div>
      <h1 className={styles.boardTitle}>My boards</h1>

      <div className={styles.boardsContainer}>
        {/* board card */}
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
      </div>
    </div>
  );
};

export default CreateBoard;
