import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { getAuth } from "firebase/auth";

export default function MyBookings() {
  const { user, loading } = use(AuthContext);
  console.log(user);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken(); // Firebase থেকে token নাও

        const response = await axios.get(
          `http://localhost:3000/bookings?email=${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response Data:", response.data); // Debugging এর জন্য

        // ✅ নিরাপদভাবে চেক করো এটা array কিনা
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.error("Unexpected data:", response.data);
          setBookings([]); // fallback empty array
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]); // fallback empty array
      }
    };

    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg m-4 shadow-md">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          You have no bookings yet.
        </h2>
        <p className="text-lg text-gray-500">
          Explore our vehicles and make your first booking today!
        </p>
        <Link
          to="/all-vehicles"
          className="mt-6 btn bg-black hover:bg-black border-none text-white"
        >
          Browse Vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 border-b-4 border-indigo-200 pb-2">
        My Bookings ({bookings.length})
      </h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-indigo-500"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-800">
                  {booking.vehicleName || "Vehicle name not available"}
                </h2>
                <p className="text-gray-500 mt-1">
                  <span className="font-mono text-sm">{booking._id}</span>
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status || "Pending"}
                </span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="font-semibold text-sm">Cost:</p>
                <p className="text-lg font-bold text-indigo-600">
                  ${booking.totalPrice || booking.pricePerDay}
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm">Vehicle Category:</p>
                <p className="text-lg">{booking.category}</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Start Date:</p>
                <p className="text-lg">
                  {booking.startDate
                    ? new Date(booking.startDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm">Last Date:</p>
                <p className="text-lg">
                  {booking.endDate
                    ? new Date(booking.endDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-end">
              <Link
                to={`/vehicle/${booking.vehicleId}`}
                className="btn btn-sm btn-outline btn-info text-xs"
              >
                View Vehicle Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
