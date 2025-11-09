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
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/all-vehicles",
        element: <AllVehicles />, 
      },
      {
        path: "/add-vehicle",
        element: <AddVehicle></AddVehicle>
      },
      {
        path: "/my-vehicle",
        element: <MyVehicles></MyVehicles>
      },
      {
        path: "/my-bookings",
        element: <MyBookings></MyBookings>
      },
    ],
  },
]);

export default router;
