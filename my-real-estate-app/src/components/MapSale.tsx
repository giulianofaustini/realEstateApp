import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { HouseProps } from "../App";
import { Link } from "react-router-dom";

export interface HousesToBuyInTheMapProps {
    houseToBuyInMap: HouseProps[];
}

type LatLongLiteral = google.maps.LatLngLiteral;
type mapOptions = google.maps.MapOptions;

export const MapSale: React.FC<HousesToBuyInTheMapProps> = ({
    houseToBuyInMap,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const mapRef = useRef<GoogleMap>();
  const [markers, setMarkers] = useState<LatLongLiteral[]>([]);
  const [userMarker, setUserMarker] = useState<LatLongLiteral | null>(null);
  const [userLocation, setUserLocation] = useState<LatLongLiteral | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<HouseProps | null>(
    null
  );
  const [infoWindowPosition, setInfoWindowPosition] =
    useState<LatLongLiteral | null>(null);

  const renderMarkers = () => (
    <>
      {userMarker && (
        <Marker
          position={userMarker}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "blue",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
          }}
        />
      )}

      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          onClick={() => handleMarkerClick(houseToBuyInMap[index], marker)}
        />
      ))}

      {selectedHouse && selectedHouse.location && (
        <InfoWindow
          position={infoWindowPosition || undefined}
          onCloseClick={() => setSelectedHouse(null)}
        >
          <Link to={`/api/houses/sale/${selectedHouse._id}`}>
            <div>
              <h2>{selectedHouse.address}</h2>
              <p>{`${selectedHouse.price} €`}</p>
            </div>
          </Link>
        </InfoWindow>
      )}
    </>
  );

  const handleMarkerClick = (
    clickedHouse: React.SetStateAction<HouseProps | null>,
    markerPosition: React.SetStateAction<google.maps.LatLngLiteral | null>
  ) => {
    setSelectedHouse(clickedHouse);
    setInfoWindowPosition(markerPosition);
  };

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

  const center = useMemo<LatLongLiteral>(
    () => userLocation || { lat: 60.192059, lng: 24.945831 },
    [userLocation]
  );

  const options = useMemo<mapOptions>(
    () => ({
      mapId: "51f5a0ad2c4c6a9d",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

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
            houseToBuyInMap.map(async (house) => {
              const { address } = house;
              return new Promise<LatLongLiteral>((resolve) => {
                geocoder.geocode({ address }, (results, status) => {
                  if (status === "OK" && results && results[0]) {
                    const location = results[0].geometry.location;
                    console.log(`Geocoded address "${address}" to:`, {
                      lat: location.lat(),
                      lng: location.lng(),
                    });
                    const lat = location.lat();
                    const lng = location.lng();

                    if (isNaN(lat) || isNaN(lng)) {
                      console.error(
                        "Invalid latitude or longitude values:",
                        location
                      );
                      resolve(null);
                    } else {
                      resolve({ lat, lng });
                    }
                  } else {
                    console.error(
                      "Geocode was not successful for the following reason:",
                      status
                    );
                    resolve(null);
                  }
                });
              });
            })
          );
          setMarkers(updatedMarkers.filter((marker) => marker !== null));
          console.log("Markers updated:", updatedMarkers);
        } catch (error) {
          console.error("Error during geocoding:", error);
        }
      };
      addressInEachHouse();
    }
  }, [houseToBuyInMap, isLoaded]);

  if (loadError) {
    console.error("Error loading Google Maps API:", loadError);
    return <div>Error loading Google Maps API</div>;
  }
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div className="flex flex-col w-3/12 h-screen items-center  ">
        <div className="uppercase text-center m-5  text-amber-950 font-bold text-5xl hover:font-extrabold ">
          House for rent
        </div>
        {houseToBuyInMap &&
          houseToBuyInMap.map((house) => (
            <div
              className=" flex flex-col items-center justify-center gap-2"
              key={house._id}
            >
              <img
                className="w-48 max-h-60 pb-2 mx-auto rounded"
                src={house.imageUrl[0]}
                alt="house image"
              />
              <div className="uppercase">{house.address}</div>
              <div className="uppercase mb-4">{house.price} €</div>
            </div>
          ))}
      </div>

      <div className="flex-1 h-screen w-9/12 ">
        <div className="map-wrapper w-4/6 h-5/6 fixed border-8 border-cyan-900">
          <GoogleMap
            center={center}
            zoom={11}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
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

