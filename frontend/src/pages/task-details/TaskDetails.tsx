import { useParams } from "react-router-dom";
import TaskDetailsBody from "../../components/TaskDetailsBody/TaskDetailsBody";
import TaskDetailsHeader from "../../components/TaskDetailsHeader/TaskDetailsHeader";
import TaskDocumentsList from "../../components/TaskDocumentsList/TaskDocumentsList";
import UploadDocumentsBox from "../../components/UploadDocumentsBox/UploadDocumentsBox";
import { useEffect } from "react";
import { useStoreProvider } from "../../stores/StoreProvider";
import { observer } from "mobx-react";
import Spinner from "../../components/Spinner/Spinner";
import TaskTimerList from "../../components/TaskTimerList/TaskTimerList";

const TaskDetails = observer(() => {
  const { id } = useParams();

  const rootStore = useStoreProvider();

  useEffect(() => {
    rootStore.taskStore.retriveTaskByID(id as string);
    rootStore.taskStore.getFilesForTaskId(id as string);
    rootStore.timerStore.getAllTimersForTaskId(id as string);
  }, [id, rootStore.taskStore, rootStore.timerStore]);

  if (rootStore.taskStore.isFetching) return <Spinner />;

  return (
    <div style={{ padding: "0 2rem" }}>
      <TaskDetailsHeader taskData={rootStore.taskStore.openTask} />
      <TaskDetailsBody taskData={rootStore.taskStore.openTask} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "30% 1fr",
          alignItems: "center",
        }}
      >
        <UploadDocumentsBox />
        <TaskDocumentsList />
      </div>
      <TaskTimerList />
    </div>
  );
});

export default TaskDetails;
