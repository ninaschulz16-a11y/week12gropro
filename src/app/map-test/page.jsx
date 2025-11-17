"use client";

import dynamic from "next/dynamic";

// import Map only on client side, no SSR
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function MapTestPage() {
  // this is the page that displays the map.
  return (
    <div style={{ padding: "20px" }}>
      {/* page title */}
      <h1>Map Test Page</h1>

      {/* render the map component */}
      <Map />
    </div>
  );
}
