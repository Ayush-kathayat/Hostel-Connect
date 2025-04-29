import React, { useEffect, useRef } from "react";

// Declare global types for TypeScript
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  name?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ lat, lng, zoom = 10, name }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define initMap globally for key_buypass.js
    window.initMap = () => {
      if (mapRef.current && window.google && window.google.maps) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
        });

        // Add marker if name is provided
        if (name) {
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: name,
          });
        }
      } else {
        console.error("Google Maps API not loaded or mapRef is null");
      }
    };

    // Load key_buypass.js
    const script = document.createElement("script");
    script.src = "/key_buypass.js"; // Assumes public/key_buypass.js
    script.async = true;
    script.defer = true;
    script.onerror = () => console.error("Failed to load key_buypass.js");
    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Only remove script if it’s still in the DOM
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete window.initMap;
    };
  }, [lat, lng, zoom, name]); // Re-run if any prop changes

  return (
    <div
      id="map"
      ref={mapRef}
      className="w-full h-[500px] rounded-lg shadow-lg"
    />
  );
};

export default GoogleMap;