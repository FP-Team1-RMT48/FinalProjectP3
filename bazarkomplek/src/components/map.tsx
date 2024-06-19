"use client";

import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
type LatLong = {
  coordinates: [lat: number, long: number];
};

export const buildMapInfoCardContent = (title: string, body: string) => {
  return `
        <div className="map_infocard_content">
            <div className="font-sm font-bold">${title}</div>
        </div>
   `;
};

export const libs: Library[] = ["core", "maps", "places", "marker"];

export function Map({
  addGeolocation,
}: {
  addGeolocation: (payload: { lat: number; lng: number }, address:string) => void
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const placesAutocomplete = useRef<HTMLInputElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const lng = Cookies.get('longitude') as string
  const lat = Cookies.get('latitude') as string
  useEffect(() => {
    if (isLoaded) {
      //map options
      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: +lat,
          lng: +lng,
        },
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };
      //setup the map
      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      );
      //limit the map bounds
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
      setMap(gMap);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        setSelectedPlace(place.formatted_address as string);
        const position = place.geometry?.location;
        if (position) {
          //place a marker
          setMarker(position, place.name!);
        }
        const geoLoc = {
          lng: position?.lat() || 0,
          lat: position?.lat() || 0,
        };

        addGeolocation(geoLoc,  place.formatted_address as string);
      });
    }
  }, [autoComplete]);

  function setMarker(location: google.maps.LatLng, name: string) {
    if (!map) return;

    map.setCenter(location);
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "Marker",
    });

    const infoCard = new google.maps.InfoWindow({
      position: location,
      content: buildMapInfoCardContent(name, name),
      maxWidth: 200,
    });
    infoCard.open({
      map: map,
      anchor: marker,
    });
  }

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
      {isLoaded ? (
        <div style={{ height: "300px" }} ref={mapRef} />
      ) : (
        <p className="text-center">Loading Maps...</p>
      )}
    </div>
  );
}
