import { HiOutlineCloudDownload, HiOutlineTrash } from "react-icons/hi";
import styles from "./taskdocumentslist.module.css";
import Tooltip from "../Tooltip/Tooltip";

const TaskDocumentsList = () => {
  return (
    <div className={styles.container}>
      <h5 className={styles.uploadedDocumentsTitle}>
        Browse documents related to the task
      </h5>
      <ul className={styles.documentsList}>
        <TaskDocumentsListItem />
        <TaskDocumentsListItem />
        <TaskDocumentsListItem />
        <TaskDocumentsListItem />
        <TaskDocumentsListItem />
      </ul>
    </div>
  );
};

export default TaskDocumentsList;

const TaskDocumentsListItem = () => {
  return (
    <li className={styles.documentRow}>
      <p>Document1</p>
      <p>{new Date().toLocaleDateString()}</p>
      <div className={styles.buttonBox}>
        <Tooltip text="Download document">
          <button className={styles.downloadButton}>
            <HiOutlineCloudDownload />
          </button>
        </Tooltip>
        <Tooltip text="Delete document">
          <button className={styles.deleteButton}>
            <HiOutlineTrash />
          </button>
        </Tooltip>
      </div>
    </li>
  );
};
