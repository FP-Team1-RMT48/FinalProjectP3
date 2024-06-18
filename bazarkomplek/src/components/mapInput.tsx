"use client";

import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

type LatLong = {
  coordinates: [lat: number, long: number];
};


export const libs: Library[] = ["core", "maps", "places", "marker"];

export function MapInput({addGeolocation}:{addGeolocation:(payload:{lat: number, lng:number})=>void}) {
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const placesAutocomplete = useRef<HTMLInputElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
   const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
  });

  useEffect(()=>{
    if (isLoaded) {
      const javaIslandBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng({ lat: -7.97, lng: 105.18 }), //south west java island
        new google.maps.LatLng({ lat: -6.14, lng: 113.921 }) //north east java island 
      );
      //setup autocomplete
      const gAutoComplete = new google.maps.places.Autocomplete(
        placesAutocomplete.current as HTMLInputElement,
        {
          bounds: javaIslandBounds,
          fields: ["formatted_address", "geometry", "name"],
          componentRestrictions: {
            country: ["id"],
          },
        }
      );
      setAutoComplete(gAutoComplete);
    }
  }, [isLoaded])

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        setSelectedPlace(place.formatted_address as string);
        const position = place.geometry?.location;
        const geoLoc = {
          lat: position?.lat() || 0,
          lng: position?.lng() || 0
        }
        addGeolocation(geoLoc)
      });
    }
    
  }, [autoComplete]);
  

  return (
    <div className="flex flex-col justify-center space-y-4">
      <input
        ref={placesAutocomplete}
        type="text"
        id="gAutocomplete"
        name="gAutocomplete"
        placeholder="Masukkan alamat"
        className="grow input bg-white text-base-100"
      />
      <label>{selectedPlace}</label>
    </div>
  );
}
