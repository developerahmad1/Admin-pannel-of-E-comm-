import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AdminProvider } from "./Context/Admin.jsx";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AdminProvider>
      <App />
      <Toaster />
    </AdminProvider>
  </>
);
