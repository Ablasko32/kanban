import StoreProvider from "./stores/StoreProvider";
import Navigation from "./components/Navigation/Navigation";
import styles from "./app.module.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { Suspense } from "react";
import Spinner from "./components/Spinner/Spinner";
import Dashboard from "./pages/dashboard/Dashboard";
import GlobalModal from "./components/GlobalModal/GlobalModal";
import Modal from "./components/Modal/Modal";

const KanbanPage = React.lazy(() => import("./pages/kanban/KanbanPage"));
const TaskDetails = React.lazy(
  () => import("./pages/task-details/TaskDetails")
);
const MyBoards = React.lazy(() => import("./pages/my-boards/MyBoards"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <StoreProvider>
        <Router>
          <div className={styles.mainLayout}>
            <Navigation />

            <div>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/board/:id" element={<KanbanPage />} />
                <Route path="/create-board" element={<MyBoards />} />
                <Route path="/task/:id" element={<TaskDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </div>

          <ToastContainer
            aria-label="Notifications"
            position="bottom-right"
            autoClose={5000}
          />
          <Modal />
        </Router>
      </StoreProvider>
    </Suspense>
  );
}

export default App;
