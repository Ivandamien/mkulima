import { Route, Routes } from "react-router-dom"; // Make sure to import from react-router-dom
import "./App.css";
import Login from "./components/Login";
import SignIn from "./components/Signin";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Report";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/password" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          {/* Nested Routes */}
          <Route index element={<h2>Welcome to the Dashboard</h2>} />{" "}
          {/* Default Dashboard content */}
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
