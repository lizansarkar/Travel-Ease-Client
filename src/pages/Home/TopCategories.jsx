// TopCategories.jsx
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "SUVs",
    slug: "suv",
    description:
      "Spacious and powerful vehicles perfect for family trips or rough terrains.",
    icon: "🚙",
  },
  {
    name: "Electric",
    slug: "electric",
    description:
      "Go green with our range of zero-emission, modern electric vehicles.",
    icon: "⚡",
  },
  {
    name: "Vans",
    slug: "van",
    description:
      "Ideal for large groups, carrying cargo, or extended vacation travel.",
    icon: "🚐",
  },
  {
    name: "Sedans",
    slug: "sedan",
    description:
      "Comfortable, economical, and the best choice for daily commuting and city drives.",
    icon: "🚗",
  },
];

export default function TopCategories() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Explore Our Top Categories
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Find the perfect ride quickly by selecting from our most popular
          vehicle types.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/all-vehicles?category=${category.slug}`}
              className="group p-6 md:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center bg-gray-50 hover:bg-blue-50"
            >
              <span className="text-5xl mb-4 transition duration-300 group-hover:scale-110">
                {category.icon}
              </span>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {category.name}
              </h3>

              <p className="text-sm text-gray-500 hidden md:block">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
