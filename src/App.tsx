import { Login, Register, Home } from "./pages";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Users } from "./pages/users";
import { Dashboard } from "./pages/common-info";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          >
            <Route
              index
              element={<Dashboard />}
            />
            <Route
              path="/users"
              element={<Users />}
            />
            <Route
              path="/projects"
              // element={<Projects />}
            />
            <Route
              path="/tasks"
              // element={<Tasks />}
            />
            <Route
              path="/time-tracking"
              // element={<TimeTracking />}
            />
            <Route
              path="/my-calendar"
              // element={<MyCalendar />}
            />
          </Route>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/create-account"
            element={<Register />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
