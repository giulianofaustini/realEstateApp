import { useCallback, useMemo, useRef } from "react";
import { GoogleMap , useLoadScript } from "@react-google-maps/api";
import { HousesForRentProps } from "../App";

export interface HousesForRentInTheMapProps {
  houseToRentInMap: HousesForRentProps[];
} 

type LatLongLiteral = google.maps.LatLngLiteral;

type mapOptions = google.maps.MapOptions;

export const Map = ( { houseToRentInMap }: HousesForRentInTheMapProps ) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });


  console.log("MAP this is the house to rent in map", houseToRentInMap);

  const mapRef = useRef<GoogleMap>()

  const center = useMemo<LatLongLiteral>(
    () => ({ lat: 60.192059, lng: 24.945831 }),
    []
  );

  const options = useMemo<mapOptions>(() => ({
      mapId: "51f5a0ad2c4c6a9d",
      disableDefaultUI: true,
      clickableIcons: false,
     
    
  })
    , []);

    const onLoad = useCallback((map) => { mapRef.current = map; }, [])



  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (

    <div className="flex">
    <div className="flex-cols w-3/12 h-screen bg-slate-100 text-black  ">
       <div className="">House for rent</div>
       { houseToRentInMap && houseToRentInMap.map((house) => (
      <div>
     
      <img className="max-w-full  max-h-auto" src={house.imageUrl[0]} alt="house image" />
      </div>
      ))}
    </div>
         
 
      
      



      <div className="flex-1 h-screen w-9/12">
        <div className="map-wrapper w-full h-full fixed">
        <GoogleMap
          center={center}
          zoom={11}
          mapContainerStyle={ {width:'100%', height:'100%', position: 'relative'} }
          options={options}
            onLoad={onLoad}
        ></GoogleMap>
        </div>
      </div>
    </div>
    
  );
};




