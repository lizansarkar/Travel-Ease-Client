import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { use } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

export default function Register() {
  const { registerWithEmailPassword } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, photoUrl, email, password);

    //password validation
    if (password.length < 6) {
      toast.error("Password length must be at least 6 characters.");
      return;
    }

    //check uppercase
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have at least one Uppercase letter (A-Z).");
      return;
    }

    //check lowercase
    if (!/[a-z]/.test(password)) {
      toast.error("Password must have at least one Lowercase letter (a-z).");
      return;
    }

    registerWithEmailPassword(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        toast.success("register successfull");

        //update user profile
        updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Something went wrong. ${error.message}`);
        // toast.error("Something went wrong.")
      });
  };

  return (
    <div className="h-auto md:min-h-screen flex justify-center items-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl md:shadow-2xl rounded-2xl p-6 md:p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-neutral mb-2">
          Create an account
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Join TravelEase — add and manage your vehicles
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          {/* Full Name Input */}
          <label className="form-control w-full">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
              required
            />
          </label>

          {/* Photo URL Input */}
          <label className="form-control w-full">
            <input
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
            />
          </label>

          {/* Email Input */}
          <label className="form-control w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
              required
            />
          </label>

          {/* Password Input */}
          <label className="form-control w-full">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
              required
            />
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Must include uppercase, lowercase, and at least 6 characters
          </p>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-full bg-[#1d4ed8] text-white hover:bg-[#2563eb] rounded-lg border-none h-12 text-base font-semibold mt-6"
          >
            Register
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?
          <Link
            className="link link-hover text-accent ml-1 font-semibold"
            to="/login"
          >
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
