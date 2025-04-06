import { HiOutlineHeart, HiPlusCircle, HiViewGrid } from "react-icons/hi";
import styles from "./navigation.module.css";
import { PiKanban } from "react-icons/pi";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import { CreateBoardForm } from "./CreateBoardForm";
import { useStoreProvider } from "../../stores/StoreProvider";
import { useMemo } from "react";
import { observer } from "mobx-react";
import { modalStore } from "../../stores/modalStore";
import Timer from "../Timer/Timer";

const Navigation = observer(() => {
  const rootStore = useStoreProvider();

  const createBoardForm = useMemo(
    () => new CreateBoardForm(rootStore),
    [rootStore]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBoardForm.submit();
  };

  const BoardFormComponent = observer(() => (
    <div>
      <form onSubmit={handleSubmit} className={styles.addBoardForm}>
        <div>
          <input
            {...createBoardForm.$("boardName").bind()}
            placeholder="Enter board name"
          />
          {createBoardForm.$("boardName").error && (
            <p
              style={{
                color: "var(--error-color)",
                fontSize: "1.1rem",
                textAlign: "center",
              }}
            >
              {createBoardForm.$("boardName").error}
            </p>
          )}
        </div>
        <button type="submit" className={styles.submit}>
          Save
        </button>
      </form>
    </div>
  ));

  return (
    <nav className={styles.navigation}>
      <ul className={styles.nav}>
        <li className={styles.logo}>
          <Link to="/">
            <PiKanban />
          </Link>
        </li>

        <li className={styles.navItem}>
          <Modal
            modalStore={modalStore}
            triggerClassName={styles.navItem}
            trigger={
              <span
                onClick={() => modalStore.openModal(<BoardFormComponent />)}
              >
                <HiPlusCircle />
                Create board
              </span>
            }
          />
        </li>
        <li>
          <Link to="/create-board" className={styles.navItem}>
            <HiViewGrid />
            My boards
          </Link>
        </li>
      </ul>
      {/* <section className={styles.boardSection}>
        <p className={styles.favouritesTitle}>
          <HiOutlineHeart /> My favourites
        </p>
        <div className={styles.boardContainer}>
          <ul className={styles.boardList}>
            <li>Board 1</li>
            <li>Board 1</li>
            <li>Board 1</li>
            <li>Board 1</li>
          </ul>
        </div>
      </section> */}

      <div className={styles.timerContainer}>
        <Timer />
      </div>
    </nav>
  );
});

export default Navigation;
