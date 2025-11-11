// src/pages/Vehicles/ViewDetail.jsx

import React, { useEffect, useState, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export default function ViewDetail() {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/travels/${id}`);
        setVehicle(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError("Failed to load vehicle details.");
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicleDetails();
    } else {
      setError("Vehicle ID not found.");
      setLoading(false);
    }
  }, [id]);

  const handleBookNow = async () => {
    if (!user) {
      toast.error("You must be logged in to book a vehicle.");
      navigate("/login");
      return;
    }

    if (vehicle.userEmail === user.email) {
      toast.error("You cannot book your own vehicle.");
      return;
    }

    const bookingData = {
      vehicleId: vehicle._id,
      vehicleName: vehicle.vehicleName,
      ownerEmail: vehicle.userEmail,
      renterEmail: user.email,
      bookingDate: new Date().toISOString(),
      status: "Pending",
      pricePerDay: vehicle.pricePerDay,
    };

    try {
      // ধরে নিচ্ছি আপনার ব্যাকএন্ডে /bookings নামে একটি POST রুট আছে
      // যা বুকিং ডেটা MongoDB তে সেভ করবে।
      const res = await axios.post(
        `http://localhost:3000/bookings`,
        bookingData
      );

      if (res.data.insertedId) {
        toast.success(
          `Booking request for ${vehicle.vehicleName} submitted successfully!`
        );
        // বুকিং সফল হলে অন্য কোনো পেজে রিডাইরেক্ট করা যেতে পারে
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Could not process booking. Server error.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-xl text-red-500">{error}</div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        No vehicle data found.
      </div>
    );
  }

  // ⭐️ আকর্ষণীয় রেসপনসিভ লেআউট ⭐️
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* বাম কলাম: ছবি */}
          <div className="lg:col-span-2">
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="w-full h-80 md:h-96 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* ডান কলাম: ডিটেইলস ও বুকিং */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                {vehicle.vehicleName}
              </h1>
              <p className="text-xl font-bold text-blue-600 mb-6">
                ${vehicle.pricePerDay} / day
              </p>

              <div className="space-y-3 mb-6">
                <p className="text-gray-600">
                  <strong>Category:</strong> {vehicle.category}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {vehicle.location}
                </p>
                <p className="text-gray-600">
                  <strong>Owner:</strong> {vehicle.ownerName}
                </p>
                <p className="text-gray-600">
                  <strong>Availability:</strong>
                  <span
                    className={`ml-2 font-semibold ${
                      vehicle.availability === "Available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {vehicle.availability}
                  </span>
                </p>
              </div>
            </div>

            {/* বুকিং বাটন */}
            <button
              onClick={handleBookNow}
              className="btn btn-lg w-full bg-green-600 text-white hover:bg-green-700 border-none mt-4 disabled:bg-gray-400"
              disabled={vehicle.availability !== "Available"}
            >
              {vehicle.availability === "Available"
                ? "Book Now"
                : "Currently Unavailable"}
            </button>
          </div>
        </div>

        <hr className="my-8" />

        {/* বিবরণী সেকশন */}
        <div className="pt-4">
          <h3 className="text-2xl font-bold mb-3 text-gray-700">Description</h3>
          <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
        </div>
      </div>
    </div>
  );
}
