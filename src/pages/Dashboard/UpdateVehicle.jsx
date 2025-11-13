import React, { useEffect, useState, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const CATEGORIES = ["SUV", "Electric", "Van", "Sedan", "Luxury", "Standard"];
const AVAILABILITY = ["Available", "Booked", "Maintenance"];

export default function UpdateVehicle() {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      if (!id) {
        setError("Vehicle ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://travel-ease-server-tawny.vercel.app/travels/${id}`);

        if (response.data.userEmail !== user?.email) {
          toast.error("You are not authorized to update this vehicle.");
          navigate("/my-vehicle");
          return;
        }

        setVehicleData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vehicle data:", err);
        setError("Failed to load vehicle details for update.");
        setLoading(false);
      }
    };

    if (id && user) {
      fetchVehicleData();
    }

  }, [id, user, navigate]);

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedData = {
      vehicleName: form.vehicleName.value,
      ownerName: form.ownerName.value,
      category: form.category.value,
      pricePerDay: parseFloat(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      description: form.description.value,
      coverImage: form.coverImage.value,
      userEmail: user.email,
    };

    if (updatedData.pricePerDay <= 0 || isNaN(updatedData.pricePerDay)) {
      toast.error("Price per day must be a valid positive number.");
      return;
    }

    try {
      const response = await axios.put(
        `https://travel-ease-server-tawny.vercel.app/vehicle/${id}`,
        updatedData
      );

      if (
        response.data.modifiedCount > 0 ||
        response.data.acknowledged === true
      ) {
        toast.success("Vehicle updated successfully!");
        navigate("/my-vehicle");
      } else {
        toast.error("Update failed or no changes were made.");
      }
    } catch (error) {
      console.error("Vehicle update error:", error);
      toast.error(`Failed to update vehicle: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner />
        <p className="mt-2">Loading vehicle data...</p>
      </div>
    );
  }

  if (error || !vehicleData) {
    return (
      <div className="text-center py-20 text-xl text-red-500">
        {error || "Could not retrieve vehicle data."}
      </div>
    );
  }

  return (
    <div className="h-auto flex justify-center items-center bg-base-200 p-4 py-12">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl md:shadow-2xl rounded-2xl p-6 md:p-10 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-neutral mb-2">
          Update Vehicle: {vehicleData.vehicleName}
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Edit the details of your listed vehicle.
        </p>

        <form onSubmit={handleUpdateVehicle} className="flex flex-col gap-5">
          {/* Vehicle Name and Owner Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="form-control w-full">
              <input
                type="text"
                name="vehicleName"
                placeholder="Vehicle Name"
                className="input input-bordered w-full rounded-lg h-12 text-neutral"
                defaultValue={vehicleData.vehicleName}
                required
              />
            </label>
            <label className="form-control w-full">
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                className="input input-bordered w-full rounded-lg h-12 text-neutral"
                defaultValue={vehicleData.ownerName}
                required
              />
            </label>
          </div>

          {/* Category & Price Per Day */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="form-control w-full">
              <select
                name="category"
                className="select select-bordered w-full rounded-lg h-12 text-neutral"
                defaultValue={vehicleData.category}
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-control w-full">
              <input
                type="number"
                name="pricePerDay"
                placeholder="Price Per Day (USD)"
                className="input input-bordered w-full rounded-lg h-12 text-neutral"
                defaultValue={vehicleData.pricePerDay}
                min="1"
                required
              />
            </label>
          </div>

          {/* Location & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="form-control w-full">
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="input input-bordered w-full rounded-lg h-12 text-neutral"
                defaultValue={vehicleData.location}
                required
              />
            </label>
            <label className="form-control w-full">
              <select
                name="availability"
                className="select select-bordered w-full rounded-lg h-12 text-neutral"
                defaultValue={vehicleData.availability}
                required
              >
                {AVAILABILITY.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Cover Image URL */}
          <label className="form-control w-full">
            <input
              type="url"
              name="coverImage"
              placeholder="Cover Image URL"
              className="input input-bordered w-full rounded-lg h-12 text-neutral"
              defaultValue={vehicleData.coverImage}
              required
            />
          </label>

          {/* Description (Textarea) */}
          <label className="form-control w-full">
            <textarea
              name="description"
              placeholder="Vehicle Description"
              className="textarea textarea-bordered h-24 rounded-lg text-neutral"
              defaultValue={vehicleData.description}
              minLength="50"
              required
            ></textarea>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-green-600 text-white hover:bg-orange-600 rounded-lg border-none h-12 text-base font-semibold mt-6"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
