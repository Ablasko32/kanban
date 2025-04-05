import { observer } from "mobx-react";
import styles from "./Layout.module.css";
import { useStoreProvider } from "../../stores/StoreProvider";
import { useDrop } from "react-dnd";
import { TaskStatus } from "../../stores/taskStore";
import LayoutColumn from "../LayoutColumn/LayoutColumn";

const Layout = observer(({ id }: { id: string }) => {
  const rootStore = useStoreProvider();

  const handleDrop = (
    taskId: string,
    newStatus: TaskStatus,
    boardId: string = id
  ) => {
    rootStore.taskStore.changeTaskStatus(taskId, newStatus, boardId);
  };

  // DROP HANDLERS FOR EACH COL
  const [{}, openDropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => handleDrop(item.id, "open"),
  }));

  const [{}, progressDropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => handleDrop(item.id, "progress"),
  }));

  const [{}, doneDropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => handleDrop(item.id, "done"),
  }));

  return (
    <div className={styles.container}>
      {/* Open column */}

      <LayoutColumn
        id={id}
        title="Open"
        type="open"
        reference={openDropRef}
        rootStore={rootStore}
      />

      {/* In progress column */}

      <LayoutColumn
        id={id}
        title="Progress"
        type="progress"
        reference={progressDropRef}
        rootStore={rootStore}
      />
      {/* Done column */}

      <LayoutColumn
        id={id}
        title="Done"
        type="done"
        reference={doneDropRef}
        rootStore={rootStore}
      />
    </div>
  );
});
export default Layout;
