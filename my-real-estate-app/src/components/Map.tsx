import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { HousesForRentProps } from "../App";
import { Link } from "react-router-dom";

import { IoMdSquareOutline } from "react-icons/io";

export interface HousesForRentInTheMapProps {
  houseToRentInMap: HousesForRentProps[];
  selectedStatusRent: { value: string; label: string } | null;
}

type LatLongLiteral = google.maps.LatLngLiteral;
type mapOptions = google.maps.MapOptions;

export const Map: React.FC<HousesForRentInTheMapProps> = ({
  houseToRentInMap,  selectedStatusRent
}) => {


  console.log("houseToRentInMap BIIIIIIIIIIGGGGGGG", houseToRentInMap);



  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });



  const mapRef = useRef<GoogleMap>();
  const [markers, setMarkers] = useState<LatLongLiteral[]>([]);
  const [userMarker, setUserMarker] = useState<LatLongLiteral | null>(null);
  const [userLocation, setUserLocation] = useState<LatLongLiteral | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<HousesForRentProps | null>(
    null
  );

  const [filteredHouses, setFilteredHouses] = useState<HousesForRentProps[]>([]);

  console.log("filteredHouses FOR RENT", filteredHouses);



  useEffect(() => {
    
    if (selectedStatusRent && selectedStatusRent.value) {
      const filtered = houseToRentInMap.filter((house) => house.status === selectedStatusRent.value);
      setFilteredHouses(filtered);
    } else {
      setFilteredHouses(houseToRentInMap);
    }
  }, [houseToRentInMap, selectedStatusRent]);


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
          onClick={() => handleMarkerClick(houseToRentInMap[index], marker)}
        />
      ))}

      {selectedHouse && selectedHouse.location && (
        <InfoWindow
          position={infoWindowPosition || undefined}
          onCloseClick={() => setSelectedHouse(null)}
        >
          <Link to={`/api/housesForRent/rent/${selectedHouse._id}`}>
            <div>
              <h2>{selectedHouse.address}</h2>
              <p>{`${selectedHouse.monthlyRent} €`}</p>
            </div>
          </Link>
        </InfoWindow>
      )}
    </>
  );

  const handleMarkerClick = (
    clickedHouse: React.SetStateAction<HousesForRentProps | null>,
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
            houseToRentInMap.map(async (house) => {
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
  }, [houseToRentInMap, isLoaded]);

  if (loadError) {
    console.error("Error loading Google Maps API:", loadError);
    return <div>Error loading Google Maps API</div>;
  }
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div className="flex flex-col md:w-3/12 h-screen text-black items-center gap-2 ">
        <div className="uppercase text-center text-2xl mt-2 md:m-5  text-amber-950 font-bold md:text-5xl md:hover:font-extrabold ">
          Houses for rent
        </div>
        
        {houseToRentInMap &&
          houseToRentInMap.map((house) => (
            <Link to={`/api/housesForRent/rent/${house._id}`} >
            <div
            className={`p-2 hover:border-l-8 rounded-xl m-2 mb-4 ${house.status === "onHold"
                ? "border-yellow-300"
                : house.status === "sold"
                  ? "border-red-500"
                  : house.status === "onSale"
                    ? "border-green-500"
                    : ""}`}
          >
            <div
              className=" flex flex-col items-center justify-center gap-2"
              key={house._id}
            >
              <img
                className="max-h-60 w-full md:w-48  md:max-h-60 pb-2 mx-auto rounded"
                src={house.imageUrl[0]}
                alt="house image"
              />
              <div className="uppercase max-w-4/5">{house.address}</div>
              <div className="uppercase ">{house.monthlyRent} €</div>
            </div>
          </div>
          </Link>
          ))}
          

      </div>

      <div className="flex-1 h-screen w-9/12 ">
        <div className="hidden md:inline md:map-wrapper md:w-4/6 h-5/6 md:fixed md:border-8 md:border-amber-600">
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
          <div className="flex items-center gap-2 flex-wrap w-4/5 mx-auto uppercase mt-3 mb-4">
    <IoMdSquareOutline  className="text-green-500 h-4 bg-green-500" />
      <span className="mr-6 text-green-500 ">  available for rent</span>
    <IoMdSquareOutline className="text-yellow-400 h-4 bg-yellow-400" />
      <span className="mr-6 text-yellow-300">  reserved. Check back for status changes</span>
    <IoMdSquareOutline className="text-red-500 h-4 bg-red-500" />
      <span className="text-red-500"> rented out/ to be removed</span>
    </div>
        </div>
      </div>
    </div>
  );
};
