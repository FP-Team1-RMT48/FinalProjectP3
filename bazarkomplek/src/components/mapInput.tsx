"use client";

import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

type LatLong = {
  coordinates: [lat: number, long: number];
};


export const libs: Library[] = ["core", "maps", "places", "marker"];

export function Map() {
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const placesAutocomplete = useRef<HTMLInputElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        setSelectedPlace(place.formatted_address as string);
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
