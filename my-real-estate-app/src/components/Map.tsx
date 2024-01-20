import React, { useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { HousesForRentProps } from "../App";

export interface HousesForRentInTheMapProps {
  houseToRentInMap: HousesForRentProps[];
}

type LatLongLiteral = google.maps.LatLngLiteral;
type mapOptions = google.maps.MapOptions;

export const Map: React.FC<HousesForRentInTheMapProps> = ({ houseToRentInMap }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const mapRef = useRef<GoogleMap>();
  const [markers, setMarkers] = useState<LatLongLiteral[]>([]);
  const [userMarker, setUserMarker] = useState<LatLongLiteral | null>(null);
  const [userLocation, setUserLocation] = useState<LatLongLiteral | null>(null);

  const renderMarkers = () => (
    <>
      {userMarker && <Marker position={userMarker} icon={{ path: google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: 'blue', fillOpacity: 1, strokeColor: 'white', strokeWeight: 2 }} />}
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </>
  );
  

  useEffect(() => {
    console.log("Fetching user location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User location retrieved successfully:", position.coords);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setUserMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const center = useMemo<LatLongLiteral>(() => userLocation || { lat: 60.192059, lng: 24.945831 }, [userLocation]);

  const options = useMemo<mapOptions>(() => ({
    mapId: "51f5a0ad2c4c6a9d",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);

  const onLoad = (map: GoogleMap) => {
    mapRef.current = map;
    console.log("Map loaded:", map);
  };

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new google.maps.Geocoder();

      const addressInEachHouse = async () => {
        try {
          console.log("Geocoding addresses for each house...");
          const updatedMarkers = await Promise.all(
            houseToRentInMap.map(async (house) => {
              const { address } = house;
              return new Promise<LatLongLiteral>((resolve) => {
                geocoder.geocode({ address }, (results, status) => {
                  if (status === 'OK' && results && results[0]) {
                    const location = results[0].geometry.location;
                    console.log(`Geocoded address "${address}" to:`, {
                      lat: location.lat(),
                      lng: location.lng(),
                    });
                    const lat = location.lat();
                    const lng = location.lng();

                    if (isNaN(lat) || isNaN(lng)) {
                      console.error('Invalid latitude or longitude values:', location);
                      resolve(null);
                    } else {
                      resolve({ lat, lng });
                    }
                  } else {
                    console.error('Geocode was not successful for the following reason:', status);
                    resolve(null);
                  }
                });
              });
            })
          );
          setMarkers(updatedMarkers.filter((marker) => marker !== null));
          console.log("Markers updated:", updatedMarkers);
        } catch (error) {
          console.error('Error during geocoding:', error);
        }
      };
      addressInEachHouse();
    }
  }, [houseToRentInMap, isLoaded]);

  if (loadError) {
    console.error("Error loading Google Maps API:", loadError);
    return <div>Error loading Google Maps API</div>;
  }
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div className="flex-cols w-3/12 h-screen bg-slate-100 text-black">
        <div className="">House for rent</div>
        {houseToRentInMap && houseToRentInMap.map((house) => (
          <div key={house._id}>
            <img className="max-w-full max-h-auto" src={house.imageUrl[0]} alt="house image" />
          </div>
        ))}
      </div>

      <div className="flex-1 h-screen w-9/12">
        <div className="map-wrapper w-full h-full fixed">
          <GoogleMap
            center={center}
            zoom={11}
            mapContainerStyle={{ width: '100%', height: '100%', position: 'relative' }}
            options={options}
            onLoad={onLoad}
          >
            {markers.map((marker, index) => (
              <Marker key={index} position={marker} />
            ))}
            {renderMarkers()}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};
