import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom"; // If using React Router
import MovieNavbar from "./components/Navbar";
import Movies from "./components/Movies";
import Admin from "./components/Admin";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// import Movies from "./Movies"; // Your Movies component
// import TVShows from "./TVShows"; // Your TV Shows component
// import Favorites from "./Favorites"; // Your Favorites component
const token = localStorage.getItem("token")

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/signup",
        element: <Signup />,
        // errorElement: <ErrorPage />,
      }, {
        path: "/admin/dashboard",
        element: token ? <Dashboard /> : <Navigate to={"/admin/login"} />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/admin/login",
        element: token ? <Navigate to={"/admin/dashboard"} /> : <Login />,
        // errorElement: <ErrorPage />,
      },

    ]
    // errorElement: <ErrorPage />,
  },
]);
function App() {
  return (
    <div>
      <MovieNavbar />
    </div>
  );
}

export default App;
