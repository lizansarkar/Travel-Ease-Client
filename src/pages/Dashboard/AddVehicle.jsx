import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { getAuth } from "firebase/auth";

const CATEGORIES = ["SUV", "Electric", "Van", "Sedan", "Luxury", "Standard"];
const AVAILABILITY = ["Available", "Booked", "Maintenance"];

export default function AddVehicle() {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    const form = e.target;
    const vehicleName = form.vehicleName.value;
    const ownerName = form.ownerName.value;
    const category = form.category.value;
    const pricePerDay = parseFloat(form.pricePerDay.value);
    // const pricePerDay = parseFloat(form.pricePerDay.value);
    const location = form.location.value;
    const availability = form.availability.value;
    const description = form.description.value;
    const coverImage = form.coverImage.value;

    const userEmail = user?.email;

    const addNewVehicle = {
      vehicleName,
      ownerName,
      category,
      pricePerDay,
      location,
      availability,
      description,
      coverImage,
      userEmail,
    }

    //added mongosdb 

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const res = await axios.post("http://localhost:3000/addedVehicle", addNewVehicle, {
        headers: {
           Authorization: `Bearer ${token}`,
        }
      })
      console.log(res.data)

      if(res.data.insertedId) {
        toast.success("Vehicle added successfully!");
        form.reset();
        navigate("/my-vehicle");
      }
      else {
        toast.error("Vehicle submission failed. Try again.");
      }
    }
    catch {
      toast.error(`Failed to add vehicle please try again`);
    }
  };

  // if(!user) {
  //   navigate("/login")
  // }

  return (
    <div>
      <div className="h-auto flex justify-center items-center bg-base-200 p-4 py-12">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl md:shadow-2xl rounded-2xl p-6 md:p-10 transition-all duration-300">
          <h2 className="text-3xl font-bold text-center text-neutral mb-2">
            Add a New Vehicle
          </h2>
          <p className="text-sm text-center text-gray-500 mb-8">
            Fill in the details to list your vehicle on TravelEase.
          </p>

          {/* form start */}
          <form onSubmit={handleAddVehicle} className="flex flex-col gap-5">
            {/* Vehicle Name & Owner Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <input
                  type="text"
                  name="vehicleName"
                  placeholder="Vehicle Name (e.g., Tesla Model 3)"
                  className="input input-bordered w-full rounded-lg h-12 text-neutral"
                  required
                />
              </label>
              <label className="form-control w-full">
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner Name"
                  className="input input-bordered w-full rounded-lg h-12 text-neutral"
                  required
                />
              </label>
            </div>

            {/* category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <select
                  name="category"
                  className="select select-bordered w-full rounded-lg h-12 text-neutral"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Category
                  </option>
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
                  placeholder="Location (e.g., Dhaka, Bangladesh)"
                  className="input input-bordered w-full rounded-lg h-12 text-neutral"
                  required
                />
              </label>
              <label className="form-control w-full">
                <select
                  name="availability"
                  className="select select-bordered w-full rounded-lg h-12 text-neutral"
                  required
                  defaultValue="Available"
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
                required
              />
            </label>

            {/* description */}
            <label className="form-control w-full">
              <textarea
                name="description"
                placeholder="Vehicle Description (min 10 characters)"
                className="textarea textarea-bordered h-24 rounded-lg text-neutral"
                minLength="10"
                required
              ></textarea>
            </label>

            {/* User Email */}
            <label className="form-control w-full">
              <input
                type="email"
                name="userEmail"
                placeholder="User Email"
                value={user?.email || ""}
                className="input input-bordered w-full rounded-lg h-12 text-neutral bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-black text-white hover:bg-[#2563eb] rounded-lg border-none h-12 text-base font-semibold mt-6"
            >
              Add Vehicle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
