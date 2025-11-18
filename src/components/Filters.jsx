"use client";

// this component is reusable on ANY page.
// it collects filter options (category, area, radius)
// and sends them back to the parent page through the `onFilterChange` callback.

import { useState } from "react";

export default function Filters({ onFilterChange }) {
  // state for selected category
  const [category, setCategory] = useState("");

  // state for selected area (simple string)
  const [area, setArea] = useState("");

  // state for radius (string or number)
  const [radius, setRadius] = useState("");

  // this function sends all selected filter values back to the page using this component
  const updateFilters = () => {
    // sending an object with all the filter values
    onFilterChange({
      category,
      area,
      radius,
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white space-y-4">
      {/* CATEGORY FILTER */}
      <div className="flex flex-col">
        {/* label for the dropdown */}
        <label className="font-semibold mb-1">Filter by Category</label>

        {/* select dropdown for categories */}
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="tools">Tools</option>
          <option value="books">Books</option>
          <option value="services">Services</option>
          <option value="furniture">Furniture</option>
          {/* can add more categories if want */}
        </select>
      </div>

      {/* AREA FILTER */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Filter by Area / City</label>

        {/*string search */}
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Enter city, postcode, or area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      {/* RADIUS FILTER */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">
          Filter by Radius (optional)
        </label>

        {/* radius is just a value. You can choose later how to use it. */}
        <select
          className="border p-2 rounded"
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

      {/* APPLY FILTERS BUTTON */}
      <button
        onClick={updateFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
}