import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router";

export default function AllVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortVehicle, setSortVehicle] = useState("");

  useEffect(() => {
    const fetchLatestVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/travels");
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
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-xl text-red-500">{error}</div>
    );
  }

  const sortedVehicles = vehicles.slice().sort((a, b) => {
    const priceA = a.pricePerDay || 0;
    const priceB = b.pricePerDay || 0;

    if (sortVehicle === "price-low-high") {
      return priceA - priceB;
    }
    if (sortVehicle === "price-high-low") {
      return priceB - priceA;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-3xl md:text-4xl font-bold">All Vehicles</h2>
        {/* aijaygay sorting ar kaj kora hoyece*/}
        <div>
          <div className="flex gap-4 items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={sortVehicle}
              onChange={(e) => setSortVehicle(e.target.value)}
            >
              <option value="">Sort By Price</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedVehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="h-60 overflow-hidden">
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-full object-cover transition duration-500 hover:scale-[1.02]"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {vehicle.vehicleName}
                </h3>
                <Link
                  to={`/vehicle/${vehicle._id}`}
                  className="btn btn-neutral btn-outline cursor-pointer"
                >
                  View Details
                </Link>
              </div>

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
    </div>
  );
}
