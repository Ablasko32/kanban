import { useParams } from "react-router-dom";
import TaskDetailsBody from "../../components/TaskDetailsBody/TaskDetailsBody";
import TaskDetailsHeader from "../../components/TaskDetailsHeader/TaskDetailsHeader";
import TaskDocumentsList from "../../components/TaskDocumentsList/TaskDocumentsList";
import UploadDocumentsBox from "../../components/UploadDocumentsBox/UploadDocumentsBox";
import { useEffect, useState } from "react";
import { useStoreProvider } from "../../stores/StoreProvider";
import { toJS } from "mobx";
import { TaskData } from "../../stores/taskStore";

const TaskDetails = () => {
  const { id } = useParams();

  const rootStore = useStoreProvider();

  const [taskData, setTaskData] = useState<TaskData | null>(null);

  useEffect(() => {
    if (!id) return;
    const selectedTask = rootStore.taskStore.retriveTaskByID(id);
    setTaskData(toJS(selectedTask));
  }, [id, rootStore.taskStore]);

  if (!taskData) return null;

  return (
    <div style={{ padding: "0 2rem" }}>
      <TaskDetailsHeader taskData={taskData} />
      <TaskDetailsBody taskData={taskData} />

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
    </div>
  );
};

export default TaskDetails;
