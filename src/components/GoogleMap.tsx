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
}

const GoogleMap: React.FC<GoogleMapProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define initMap globally for key_buypass.js
    window.initMap = () => {
      if (mapRef.current && window.google) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 10, // City-level zoom
        });
      }
    };

    // Load key_buypass.js
    const script = document.createElement("script");
    script.src = "/key_buypass.js"; // Assumes public/key_buypass.js
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.initMap;
    };
  }, [lat, lng]); // Re-run if coordinates change

  return (
    <div
      id="map"
      ref={mapRef}
      className="w-full h-[500px] rounded-lg shadow-lg"
    />
  );
};

export default GoogleMap;