import { Login, Register, Home, Header } from "./pages";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
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
          element={<Register />}
        />
      </Routes>
    </>
  );
}

export default App;
