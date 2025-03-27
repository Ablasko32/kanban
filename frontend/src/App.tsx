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
import CreateBoard from "./pages/create-board/CreateBoard";

function App() {
  return (
    <Router>
      <StoreProvider>
        <div className={styles.mainLayout}>
          <Navigation />
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/board" />} />
              <Route path="/board" element={<KanbanPage />} />
              <Route path="/create-board" element={<CreateBoard />} />
            </Routes>
          </div>
        </div>
      </StoreProvider>
    </Router>
  );
}

export default App;
