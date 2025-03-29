import { HiOutlineHeart, HiPlusCircle, HiViewGrid } from "react-icons/hi";
import styles from "./navigation.module.css";
// import Timer from "../Timer/Timer";
import { PiKanban } from "react-icons/pi";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.nav}>
        <li className={styles.logo}>
          <Link to="/">
            <PiKanban />
          </Link>
        </li>
        <li className={styles.navItem}>
          <HiPlusCircle />
          Create board
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

      {/* <div className={styles.timerContainer}>
        <p>Track your time</p>
        <Timer />
      </div> */}
    </nav>
  );
};

export default Navigation;
