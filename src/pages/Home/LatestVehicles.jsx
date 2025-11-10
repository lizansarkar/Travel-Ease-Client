import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LatestVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectVehicle, setSelectVehicle] = useState(null);

  useEffect(() => {
    const fetchLatestVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/letestTravels");
        setVehicles(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching latest vehicles:", err);
        setError("Failed to load latest vehicle data.");
        setLoading(false);
      }
    };

    fetchLatestVehicles();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-xl">
        Loading latest vehicles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-xl text-red-500">{error}</div>
    );
  }

  const handleDetails = (vehicle) => {
    setSelectVehicle(vehicle);
    document.getElementById("my_modal_5").showModal();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">
        Featured Vehicles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle) => (
          <div
            onClick={() => handleDetails(vehicle)}
            key={vehicle._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
          >
            <div className="h-60 overflow-hidden">
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-full object-cover transition duration-500 hover:scale-[1.02]"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {vehicle.vehicleName}
              </h3>

              <div className="flex justify-between items-center mt-2 pt-2 border-t">
                <p className="text-sm text-gray-500">{vehicle.owner}</p>

                <p className="text-lg font-bold text-gray-800">
                  ${vehicle.pricePerDay || 0}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    / day
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* aikhane modal jodi click dey tahole dekhabe nahole dekhabe na */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        {selectVehicle && (
          <div className="modal-box p-0 max-w-2xl">
            <img
              src={selectVehicle.coverImage}
              alt={selectVehicle.vehicleName}
              className="w-full h-64 object-cover rounded-t-xl"
            />

            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2">
                {selectVehicle.vehicleName}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Owner: {selectVehicle.owner} | Category:{" "}
                {selectVehicle.category}
              </p>

              <p className="text-xl font-extrabold text-blue-600 mb-4">
                Rent: ${selectVehicle.pricePerDay} / day
              </p>

              <p className="mb-4 text-gray-700">{selectVehicle.description}</p>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  <strong>Location:</strong> {selectVehicle.location}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      selectVehicle.availability === "Available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectVehicle.availability}
                  </span>
                </p>
              </div>
            </div>

            <div className="modal-action p-4 border-t">
              <form method="dialog">
                <button className="btn btn-outline">Close</button>
                <button className="btn btn-primary ml-2">Book Now</button>
              </form>
            </div>
          </div>
        )}
      </dialog>

      <div className="text-center mt-12">
        <Link
          to="/all-vehicles"
          className="btn btn-lg bg-blue-600 hover:bg-blue-700 text-white border-none"
        >
          View All Vehicles
        </Link>
      </div>
    </div>
  );
}
