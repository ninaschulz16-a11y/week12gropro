"use client";

import { useState } from "react";

export default function Filters({ onFilterChange }) {
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [radius, setRadius] = useState("");

  const updateFilters = () => {
    if (typeof onFilterChange === "function") {
      onFilterChange({
        category,
        area,
        radius,
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white space-y-4">
      {/* category filter */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-800">Filter by Category</label>
        <select
          className="bg-gray-100 text-gray-800 rounded-2xl px-3 py-2 border border-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Job">Job</option>
          <option value="Lend">Lend</option>
          <option value="Send">Send</option>
          <option value="Service">Service</option>
        </select>
      </div>

      {/* area filter */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-800">Filter by Area / City</label>
        <input
          type="text"
          className="bg-gray-100 text-gray-800 rounded-2xl px-3 py-2 border border-gray-300 placeholder-gray-500"
          placeholder="Enter city, postcode, or area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      {/* radius filter */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-800">Filter by Radius (optional)</label>
        <select
          className="bg-gray-100 text-gray-800 rounded-2xl px-3 py-2 border border-gray-300"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        >
          <option value="">Any Distance</option>
          <option value="1">1 mile</option>
          <option value="3">3 miles</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
        </select>
      </div>

      {/* apply filters btn */}
      <button
        onClick={updateFilters}
        className="bg-green-700 text-white mt-4 mb-4 px-6 py-2 rounded-full hover:bg-green-800 transition"
      >
        Apply Filters
      </button>
    </div>
  );
}