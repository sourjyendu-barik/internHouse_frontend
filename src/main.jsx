import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AddNewJob from "./pages/AddNewJob.jsx";
import JobContextProvider from "./context/JobContextProvider";
import JobDetails from "./pages/JobDetails.jsx";
import { ToastContainer } from "react-toastify";
import JobPosting from "./pages/JobPosting.jsx";
const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/post-job", element: <AddNewJob /> },
  { path: "/jobDetails/:id", element: <JobDetails /> },
  { path: "/job-posting", element: <JobPosting /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JobContextProvider>
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" autoClose={2000} />
    </JobContextProvider>
  </StrictMode>
);
