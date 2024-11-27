import { Route, Routes } from "react-router-dom"; // Ensure you're importing from react-router-dom
import "./App.css";
import Login from "./components/Login";
import SignIn from "./components/Signin";
import Dashboard from "./pages/Dashboard"; // Dashboard component
import Transactions from "./pages/Transactions";
import Reports from "./pages/Report";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Login route (default route) */}
        <Route index element={<Login />} />

        {/* SignIn route */}
        <Route path="/password" element={<SignIn />} />

        {/* Dashboard route with nested routes */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          {/* Nested Routes inside Dashboard */}
          <Route index element={<h2>Welcome to the Dashboard</h2>} />{" "}
          {/* Default content */}
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
