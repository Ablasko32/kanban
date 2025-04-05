import StoreProvider from "./stores/StoreProvider";
import Navigation from "./components/Navigation/Navigation";
import styles from "./app.module.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import KanbanPage from "./pages/kanban/KanbanPage";
import MyBoards from "./pages/my-boards/MyBoards";
import { ToastContainer } from "react-toastify";
import TaskDetails from "./pages/task-details/TaskDetails";

function App() {
  return (
    <Router>
      <StoreProvider>
        <div className={styles.mainLayout}>
          <Navigation />
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
  );
}

export default App;
