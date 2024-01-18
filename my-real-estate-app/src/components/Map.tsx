import { useMemo } from "react";
import { GoogleMap , useLoadScript } from "@react-google-maps/api";

type LatLongLiteral = google.maps.LatLngLiteral;

export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const center = useMemo<LatLongLiteral>(
    () => ({ lat: 60.192059, lng: 24.945831 }),
    []
  );

  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div className="w-3/12 h-screen bg-slate-100 text-black">House for rent</div>
      <div className="h-screen w-9/12">
        <div className="map-wrapper w-full h-full">
        <GoogleMap
          center={center}
          zoom={11}
          mapContainerStyle={ {width:'100%', height:'100%', position: 'relative'} }
          
        ></GoogleMap>
        </div>
      </div>
    </div>
  );
};




