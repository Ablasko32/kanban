import StoreProvider from "./stores/StoreProvider";
import Navigation from "./components/Navigation/Navigation";
import styles from "./app.module.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
// import KanbanPage from "./pages/kanban/KanbanPage";
// import MyBoards from "./pages/my-boards/MyBoards";
import { ToastContainer } from "react-toastify";
// import TaskDetails from "./pages/task-details/TaskDetails";
import React, { Suspense } from "react";
import Spinner from "./components/Spinner/Spinner";

const KanbanPage = React.lazy(() => import("./pages/kanban/KanbanPage"));
const TaskDetails = React.lazy(
  () => import("./pages/task-details/TaskDetails")
);
const MyBoards = React.lazy(() => import("./pages/my-boards/MyBoards"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <StoreProvider>
          <div className={styles.mainLayout}>
            <Navigation />
            {/* Suspense boundary */}

            <div>
              <Routes>
                <Route path="/" element={<Navigate to="/create-board" />} />
                <Route path="/board/:id" element={<KanbanPage />} />
                <Route path="/create-board" element={<MyBoards />} />
                <Route path="/task/:id" element={<TaskDetails />} />
              </Routes>
            </div>
          </div>

          <ToastContainer
            aria-label="Notifications"
            position="bottom-right"
            autoClose={5000}
          />
        </StoreProvider>
      </Router>
    </Suspense>
  );
}

export default App;
