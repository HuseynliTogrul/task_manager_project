import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  Dashboard,
  Users,
  Blogs,
  MyCalendar,
  Tasks
} from "./pages";
import { AppLayout, Layout } from "./components";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<AppLayout />}
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
              path="/blogs"
              element={<Blogs />}
            />
            <Route
              path="/tasks"
              element={<Tasks />}
            />
            <Route
              path="/time-tracking"
              // element={<TimeTracking />}
            />
            <Route
              path="/my-calendar"
              element={<MyCalendar />}
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
