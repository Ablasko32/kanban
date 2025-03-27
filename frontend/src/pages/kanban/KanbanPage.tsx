import { DndProvider } from "react-dnd";
import Header from "../../components/Header/Header";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "../../components/Layout/Layout";

const KanbanPage = () => {
  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Layout />
      </DndProvider>
    </>
  );
};

export default KanbanPage;
