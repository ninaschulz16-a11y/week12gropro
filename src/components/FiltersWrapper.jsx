"use client";
import Filters from "./Filters";

export default function FiltersWrapper() {
  const handleFilterChange = (filters) => {
    console.log(filters);
  };

  return <Filters onFilterChange={handleFilterChange} />;
}