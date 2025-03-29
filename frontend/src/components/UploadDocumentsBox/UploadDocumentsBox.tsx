import styles from "./uploaddocumentsbox.module.css";

const UploadDocumentsBox = () => {
  return (
    <div>
      <h5 className={styles.uploadDocumentsTitle}>
        Upload documents related to the task
      </h5>
      <div className={styles.uploadBox}>
        <label className={styles.fileLabel} htmlFor="fileInput">
          Choose a file
        </label>
        <input className={styles.fileInput} id="fileInput" type="file" />
        <p>Or Drag&Drop</p>
      </div>
    </div>
  );
};

export default UploadDocumentsBox;
