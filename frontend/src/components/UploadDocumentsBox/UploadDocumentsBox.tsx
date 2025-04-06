import { useParams } from "react-router-dom";
import styles from "./uploaddocumentsbox.module.css";
import { ChangeEvent, useState } from "react";
import { useStoreProvider } from "../../stores/StoreProvider";

const UploadDocumentsBox = () => {
  const [isOver, setOver] = useState(false);

  const { id: taskId } = useParams();
  const rootStore = useStoreProvider();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    rootStore.taskStore.uploadFileForTask(file, taskId as string);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      rootStore.taskStore.uploadFileForTask(file, taskId as string);
    }
    setOver(false);
  }

  return (
    <div
      style={{
        opacity: isOver ? "0.6" : "1",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragEnter={(e) => e.preventDefault()}
      onDragExit={() => setOver(false)}
      onDrop={handleDrop}
    >
      <h5 className={styles.uploadDocumentsTitle}>
        Upload documents related to the task
      </h5>
      <div className={styles.uploadBox}>
        <label className={styles.fileLabel} htmlFor="fileInput">
          Choose a file
        </label>
        <input
          onChange={handleChange}
          className={styles.fileInput}
          id="fileInput"
          type="file"
        />
        <p>Or Drag&Drop</p>
      </div>
    </div>
  );
};

export default UploadDocumentsBox;
