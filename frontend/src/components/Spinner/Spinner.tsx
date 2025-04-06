import styles from "./spinner.module.css";

const Spinner = ({ type }: { type?: string }) => {
  return (
    <div
      className={`${
        type === "tiny" ? styles.spinnerTinyBox : styles.spinnerBox
      }`}
    >
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
