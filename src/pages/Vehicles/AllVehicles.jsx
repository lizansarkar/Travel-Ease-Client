import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router";

export default function AllVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectVehicle, setSelectVehicle] = useState(null);
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

  const sortedVehicles = vehicles
    // 1. .slice() ব্যবহার করে মূল অ্যারের একটি কপি তৈরি করা
    .slice()
    .sort((a, b) => {
      // ডেটা থেকে দাম (pricePerDay) বের করা
      const priceA = a.pricePerDay || 0;
      const priceB = b.pricePerDay || 0;

      if (sortVehicle === "price-low-high") {
        // কম থেকে বেশি দাম (A থেকে B বিয়োগ)
        return priceA - priceB;
      }
      if (sortVehicle === "price-high-low") {
        // বেশি থেকে কম দাম (B থেকে A বিয়োগ)
        return priceB - priceA;
      }
      // কোনো সর্টিং সিলেক্ট না হলে, ডিফল্ট অর্ডার বজায় থাকবে
      return 0;
    });

  const handleAllVehicles = (vehicle) => {
    setSelectVehicle(vehicle);
    document.getElementById("my_modal_5").showModal();
  };

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
                <button
                  onClick={() => handleAllVehicles(vehicle)}
                  className="btn btn-neutral btn-outline cursor-pointer"
                >
                  View Details
                </button>
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

      {/* <div className="text-center mt-12">
        <Link
          to="/all-vehicles"
          className="btn btn-lg bg-blue-600 hover:bg-blue-700 text-white border-none"
        >
          View All Vehicles
        </Link>
      </div> */}
    </div>
  );
}
