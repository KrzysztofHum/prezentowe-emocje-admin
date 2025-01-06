import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContextDef";
import Register from "./pages/Register";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Admin /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
