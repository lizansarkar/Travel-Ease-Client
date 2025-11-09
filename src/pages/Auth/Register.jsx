import React, { use, useState } from "react";
import { Link } from "react-router";
// import { AuthContext } from '../../context/AuthContext';

export default function Register() {
  // const {} = use(AuthContext);

  const [formData, setFormData] = useState({
    fullName: "",
    photoUrl: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register Attempt:", formData);
    alert("register successfull");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8 transition-all duration-300">
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
              name="fullName"
              placeholder="Full name"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          {/* Photo URL Input */}
          <label className="form-control w-full">
            <input
              type="url"
              name="photoUrl"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
              value={formData.photoUrl}
              onChange={handleChange}
            />
          </label>

          {/* Email Input */}
          <label className="form-control w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
          <Link className="link link-hover text-accent ml-1 font-semibold" to='/login'>login</Link>
        </p>
      </div>
    </div>
  );
}
