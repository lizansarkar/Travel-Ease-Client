import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

export default function MyBookings() {
  const { user, loading } = React.useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();

        const response = await axios.get(
          `http://localhost:3000/bookings?email=${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.error("Unexpected data:", response.data);
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings. 403 Forbidden.");
        setBookings([]);
      }
    };

    if (user?.email && !loading) {
      fetchBookings();
    }
  }, [user, loading]);

  const handleViewDetails = async (vehicleId) => {
    setModalLoading(true);
    setIsModalOpen(true);
    setSelectedVehicle(null);

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const response = await axios.get(
        `http://localhost:3000/travels/${vehicleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedVehicle(response.data);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      toast.error("Could not load vehicle details.");
      setIsModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

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
          className="mt-6 btn bg-black border-none text-white"
        >
          Browse Vehicles
        </Link>
      </div>
    );
  }

  const VehicleDetailsModal = ({ vehicle, onClose }) => {
    if (!vehicle) return null;

    return (
      <div
        className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <h2 className="text-3xl font-bold text-black mb-2 border-b pb-2">
              {vehicle.vehicleName || "Vehicle Details"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {vehicle.modelYear || "Model year not specified"}
            </p>

            <div className="space-y-3">
              <p className="flex justify-between">
                <span className="font-semibold text-gray-700">Category:</span>
                <span className="text-black font-medium">
                  {vehicle.category}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Price Per Day:
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${vehicle.pricePerDay}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Owner Email:
                </span>
                <span className="text-gray-600 break-all">
                  {vehicle.userEmail}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700 block mb-1">
                  Description:
                </span>
                <span className="text-gray-500 text-sm italic">
                  {vehicle.description || "No description provided."}
                </span>
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="btn bg-gray-300 hover:bg-gray-400 border-none text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-black mb-8 border-b-4 border-gray-200 pb-2">
        My Bookings ({bookings.length})
      </h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-black"
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
                <p className="text-lg font-bold text-green-600">
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
              <button
                onClick={() => handleViewDetails(booking.vehicleId)} // Link এর বদলে Button এবং নতুন হ্যান্ডলার কল
                className="btn btn-sm btn-outline btn-info text-xs"
                disabled={modalLoading}
              >
                {modalLoading ? "Loading..." : "View Vehicle Details"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && !modalLoading && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          onClose={handleCloseModal}
        />
      )}

      {isModalOpen && modalLoading && (
        <div className="fixed inset-0 bg-opacity-30 z-40 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
