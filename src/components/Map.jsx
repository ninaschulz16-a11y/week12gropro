"use client";
// this component must run on the client (browser) side

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // import main react leaflet components
import L from "leaflet"; // leaflet core for custom icons
import "leaflet/dist/leaflet.css"; // import default leaflet styles

export default function Map() {
  const [position, setPosition] = useState([0, 0]);
  // default coordinates, will update to user's location

  useEffect(() => {
    // check if geolocation is available in the browser
    if (navigator.geolocation) {
      // get initial position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.log(err)
      );

      // watch position to update marker if user moves
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.log(err)
      );

      // cleanup watcher when component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // custom icon for the marker
  const customIcon = L.icon({
    iconUrl: "/pin.png", // path to your custom pin image in public folder
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which corresponds to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to iconAnchor
  });

  return (
    <MapContainer
      center={position} // center map on user's position
      zoom={13} // initial zoom
      style={{ height: "400px", width: "100%" }} // map container size
    >
      <TileLayer
        // tile layer from open street map
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        {/* marker at user's coordinates */}
        <Popup>📍 You are here</Popup>
      </Marker>
    </MapContainer>
  );
}
