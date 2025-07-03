import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import SingleCar from "./pages/SingleCar/SingleCar";
import Login from "./pages/Login/Login";
import NewCar from "./pages/NewCar/NewCar";
import Search from "./pages/Search/Search";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/new-post",
        element: (
          <ProtectedRoute>
            <NewCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/car/:id",
        element: <SingleCar />,
      },
    ],
  },
]);
export default router;
