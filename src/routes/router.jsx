// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllVehicles from "../pages/Vehicles/AllVehicles";
import AddVehicle from "../pages/Dashboard/AddVehicle";
import MyVehicles from "../pages/Dashboard/MyVehicles";
import MyBookings from "../pages/Dashboard/MyBookings";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import ViewDetail from "../pages/Vehicles/ViewDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/all-vehicles",
        element: (
          <PrivateRoute>
            <AllVehicles />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-vehicle",
        element: (
          <PrivateRoute>
            <AddVehicle></AddVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-vehicle",
        element: (
          <PrivateRoute>
            <MyVehicles></MyVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "/vehicle/:id",
        element: (
          <PrivateRoute>
            <ViewDetail></ViewDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);

export default router;
