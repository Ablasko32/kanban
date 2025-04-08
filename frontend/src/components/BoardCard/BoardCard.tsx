import { Link } from "react-router-dom";
import styles from "./boardcard.module.css";
import Tooltip from "../Tooltip/Tooltip";
import {
  HiOutlineCalendar,
  HiOutlineChevronDoubleRight,
  HiOutlineTrash,
} from "react-icons/hi";
import { observer } from "mobx-react";
import { useStoreProvider } from "../../stores/StoreProvider";

export interface Board {
  id: number;
  boardName: string;
  dateCreated: Date;
}

const BoardCard = observer(({ board }: { board: Board }) => {
  const rootStore = useStoreProvider();

  async function handleBoardDelete() {
    try {
      await rootStore.boardStore.deleteBoard(board.id);
      rootStore.notificationStore.sendSucess(
        `Board ${board.boardName} deleted`
      );
    } catch (err) {
      console.error(err);
      rootStore.notificationStore.sendError("Error deleting board");
    }
  }

  return (
    <div className={styles.boardCard}>
      <h4>{board.boardName}</h4>
      <p>
        <Tooltip text="Date when board was created">
          <HiOutlineCalendar />
          {new Date(board.dateCreated).toLocaleDateString()}
        </Tooltip>
      </p>
      <button className={styles.openBoard}>
        <Tooltip text="Open board">
          <Link to={`/board/${board.id}`}>
            <HiOutlineChevronDoubleRight />
          </Link>
        </Tooltip>
      </button>
      <button
        onClick={() =>
          rootStore.modalStore.showConfirm("Are you sure?", handleBoardDelete)
        }
        className={styles.delete}
      >
        <Tooltip text="Delete board">
          <HiOutlineTrash />
        </Tooltip>
      </button>
    </div>
  );
});

export default BoardCard;
