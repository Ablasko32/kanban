import { DndProvider } from "react-dnd";
import Header from "../../components/Header/Header";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStoreProvider } from "../../stores/StoreProvider";
import { observer } from "mobx-react";

const KanbanPage = observer(() => {
  const { id } = useParams();

  const rootStore = useStoreProvider();

  useEffect(() => {
    rootStore.taskStore.fetchAllTasksForBoardId(id as string);
  }, [rootStore.taskStore, id]);

  return (
    <>
      <Header id={id as string} />
      <DndProvider backend={HTML5Backend}>
        <Layout id={id as string} />
      </DndProvider>
    </>
  );
});

export default KanbanPage;
