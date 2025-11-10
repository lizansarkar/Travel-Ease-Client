// Banner.jsx
import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner.jpg";

const Banner = () => {
  return (
    <section
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center flex items-center justify-start text-white p-4 md:p-8"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="container flex justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content Area */}
        <div className="">
          <div className="relative flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-center">
              Find the Best Vehicle <br /> for Your Journey
            </h1>
            <div className="flex gap-4">
              <Link
                to="/all-vehicles"
                className="btn bg-blue-600 hover:bg-blue-700 text-white border-none text-lg md:px-8 md:py-3"
              >
                All Vehicles
              </Link>
              <Link
                to="/add-vehicle"
                className="btn bg-gray-700 hover:bg-gray-800 text-white border-none text-lg md:px-8 md:py-3"
              >
                Add Vehicle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
