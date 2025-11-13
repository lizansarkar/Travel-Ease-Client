import React, { useEffect, useState, use } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getAuth } from "firebase/auth";

export default function MyVehicles() {
  const { user, loading: authLoading } = use(AuthContext);
  // const navigate = useNavigate();

  const [myVehicles, setMyVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyVehicles = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const response = await axios.get(
        `https://travel-ease-server-tawny.vercel.app/my-vehicles?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyVehicles(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching my vehicles:", err);
      setError("Failed to load your vehicle data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    fetchMyVehicles();
  }, [user, authLoading]);

  const handleDelete = async () => {
    if (!deletingId) {
      return;
    }

    try {
      const response = await axios.delete(
        `https://travel-ease-server-tawny.vercel.app/vehicle/${deletingId}`
      );

      if (response.data.deletedCount > 0) {
        toast.success("Vehicle deleted successfully!");

        setMyVehicles(
          myVehicles.filter((vehicle) => vehicle._id !== deletingId)
        );
      } else {
        toast.error("Deletion failed or vehicle not found.");
      }
    } catch (err) {
      console.error("Deletion error:", err);
      toast.error("Could not delete vehicle. Server error.");
    } finally {
      setDeletingId(null);
      document.getElementById("delete_modal").close();
    }
  };

  if (loading || authLoading) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-xl text-red-500">{error}</div>
    );
  }

  if (myVehicles.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl text-gray-700">
          You haven't added any vehicles plz vai add koren.
        </h3>
        <Link to="/add-vehicle" className="btn btn-primary mt-4">
          Add Your First Vehicle
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 border-b pb-3">
        My Listed Vehicles ({myVehicles.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myVehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {vehicle.vehicleName}
              </h3>
              <p className="text-lg font-bold text-blue-600 mb-3">
                ${vehicle.pricePerDay}
                <span className="text-sm font-normal text-gray-500">/ day</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Location: {vehicle.location} | Status: {vehicle.availability}
              </p>

              <div className="flex gap-2 border-t pt-3">
                {/* View Details Button */}
                <Link
                  to={`/vehicle/${vehicle._id}`}
                  className="btn btn-sm btn-outline btn-info flex-1"
                  title="View Full Details"
                >
                  Details
                </Link>

                {/* Update Button */}
                <Link
                  to={`/update-vehicle/${vehicle._id}`}
                  className="btn btn-sm btn-outline btn-warning flex-1"
                  title="Update Vehicle Data"
                >
                  Update
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    setDeletingId(vehicle._id);
                    document.getElementById("delete_modal").showModal();
                  }}
                  className="btn btn-sm btn-outline btn-error flex-1"
                  title="Delete Vehicle"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">Confirm Deletion</h3>

          <p className="py-4">
            Are you sure you want to delete this vehicle? This action cannot be
            undone.
          </p>

          <div className="modal-action">
            <button className="btn btn-error text-white" onClick={handleDelete}>
              Yes, Delete It
            </button>

            <button
              className="btn"
              onClick={() => {
                setDeletingId(null);
                document.getElementById("delete_modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
