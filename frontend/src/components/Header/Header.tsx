import BoardIndicator from "../BoardIndicator/BoardIndicator";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* <h1 className={styles.mainTitle}>Track your tasks</h1> */}
      <BoardIndicator />
    </header>
  );
};

export default Header;
