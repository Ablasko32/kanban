import { HiOutlineCloudDownload, HiOutlineTrash } from "react-icons/hi";
import styles from "./taskdocumentslist.module.css";
import Tooltip from "../Tooltip/Tooltip";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStoreProvider } from "../../stores/StoreProvider";
import { observer } from "mobx-react";
import { TaskFileData } from "../../stores/taskStore";
import { RootStore } from "../../stores/rootStore";

const TaskDocumentsList = observer(() => {
  const rootStore = useStoreProvider();
  const { id } = useParams();

  useEffect(() => {
    rootStore.taskStore.getFilesForTaskId(id as string);
  }, [id, rootStore.taskStore]);

  return (
    <div className={styles.container}>
      <h5 className={styles.uploadedDocumentsTitle}>
        Browse documents related to the task
      </h5>
      <ul className={styles.documentsList}>
        {rootStore.taskStore.taskFileData.map((file) => {
          return (
            <TaskDocumentsListItem
              rootStore={rootStore}
              file={file}
              key={file.id}
            />
          );
        })}
      </ul>
    </div>
  );
});

export default TaskDocumentsList;

const TaskDocumentsListItem = observer(
  ({ file, rootStore }: { file: TaskFileData; rootStore: RootStore }) => {
    return (
      <li className={styles.documentRow}>
        <p>{file.name}</p>
        <p>{new Date(file.dateCreated).toLocaleDateString()}</p>
        <p>{file.type}</p>
        <div className={styles.buttonBox}>
          <Tooltip text="Download document">
            <a
              href={`${import.meta.env.VITE_API_URL}${file.path}`}
              download={file.name}
              className={styles.downloadButton}
            >
              <HiOutlineCloudDownload />
            </a>
          </Tooltip>
          <Tooltip text="Delete document">
            <button
              onClick={() =>
                rootStore.taskStore.deleteTaskFilesById(
                  String(file.id),
                  file.taskId
                )
              }
              className={styles.deleteButton}
            >
              <HiOutlineTrash />
            </button>
          </Tooltip>
        </div>
      </li>
    );
  }
);
