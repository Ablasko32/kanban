import { observer } from "mobx-react";
import styles from "./Layout.module.css";
import { useStoreProvider } from "../../stores/StoreProvider";
import { useDrop } from "react-dnd";
import { TaskStatus } from "../../stores/taskStore";
import LayoutColumn from "../LayoutColumn/LayoutColumn";

const Layout = observer(() => {
  const rootStore = useStoreProvider();

  const handleDrop = (taskId: string, newStatus: TaskStatus) => {
    rootStore.taskStore.changeTaskStatus(taskId, newStatus);
  };

  // DROP HANDLERS FOR EACH COL
  const [{}, openDropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => handleDrop(item.id, "open"),
  }));

  const [{}, progressDropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => handleDrop(item.id, "inProgress"),
  }));

  const [{}, doneDropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => handleDrop(item.id, "done"),
  }));

  return (
    <div className={styles.container}>
      {/* Open column */}

      <LayoutColumn
        title="Open"
        type="open"
        reference={openDropRef}
        rootStore={rootStore}
      />

      {/* In progress column */}

      <LayoutColumn
        title="Progress"
        type="progress"
        reference={progressDropRef}
        rootStore={rootStore}
      />
      {/* Done column */}

      <LayoutColumn
        title="Done"
        type="done"
        reference={doneDropRef}
        rootStore={rootStore}
      />
    </div>
  );
});
export default Layout;
