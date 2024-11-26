import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./pages/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Header />
    <App />
  </BrowserRouter>
);
