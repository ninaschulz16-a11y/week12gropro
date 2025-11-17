"use client";

// this page is ONLY for testing the Filters component.
// it receives the filter values and displays them on the screen.

import { useState } from "react";
import Filters from "@/components/Filters";

export default function FilterTestPage() {
  // state that stores the selected filters from the Filters component
  const [filters, setFilters] = useState(null);

  return (
    <div className="p-8 space-y-6">
      {/* title */}
      <h1 className="text-2xl font-bold">Filter Test Page</h1>

      {/* the Filters component */}
      <Filters onFilterChange={(values) => setFilters(values)} />

      {/* displaying the filters on the screen */}
      <div className="p-4 border rounded bg-gray-100">
        <h2 className="font-semibold mb-2">Current Filters:</h2>

        {filters ? (
          <pre className="text-sm">
            {/* displaying the object nicely */}
            {JSON.stringify(filters, null, 2)}
          </pre>
        ) : (
          <p>No filters selected yet.</p>
        )}
      </div>
    </div>
  );
}
