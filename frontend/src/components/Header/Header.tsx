import BoardIndicator from "../BoardIndicator/BoardIndicator";
import styles from "./header.module.css";

const Header = ({ id }: { id: string }) => {
  return (
    <header className={styles.header}>
      <BoardIndicator id={id} />
    </header>
  );
};

export default Header;
