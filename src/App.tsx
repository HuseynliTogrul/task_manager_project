import { Login, CreateAccount, Home } from "./pages";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/create-account"
          element={<CreateAccount />}
        />
      </Routes>
    </>
  );
}

export default App;
