"use client";

import { useState } from "react";

export default function Filters({ onFilterChange }) {
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [radius, setRadius] = useState("");

  const updateFilters = () => {
    // send values to parent page only if a function is given
    if (typeof onFilterChange === "function") {
      onFilterChange({
        category,
        area,
        radius,
      });
    }
  };

  // this returns the visible UI
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white space-y-4">
      {/* category filter */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Filter by Category</label>

        <select
          className=" bg-[#EFEFEF]  rounded-2xl px-3 py-2"
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
        <label className="font-semibold mb-1">Filter by Area / City</label>

        <input
          type="text"
          className="bg-[#EFEFEF]  rounded-2xl px-3 py-2"
          placeholder="Enter city, postcode, or area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      {/* radius filter */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">
          Filter by Radius (optional)
        </label>

        <select
          className="bg-[#EFEFEF]  rounded-2xl px-3 py-2"
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
        className="bg-[#3E513E] text-white mt-8 mb-8 w-32 py-2 rounded-full hover:bg-[#3E513E] hover:text-white disabled:opacity-60"
      >
        Apply Filters
      </button>
    </div>
  );
}
