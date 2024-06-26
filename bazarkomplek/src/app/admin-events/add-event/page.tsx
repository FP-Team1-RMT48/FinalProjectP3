"use client";

import { addEvent } from "@/app/action";
import { Map } from "@/components/map";
import { useState } from "react";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Swal from "sweetalert2";

export default function AddEventPage() {
  const [cloudinaryUrl, setCloudinaryUrl] = useState<any>("");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    locations: {
      type: "Point",
      coordinates: [0, 0],
    },
    eventImg: cloudinaryUrl,
    startDate: "",
    endDate: "",
    lapakSlots: 0,
    filledLapakSlots: 0,
    eventSlug: "",
  });
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleFormData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const addedEvent = {
        ...formData,
        eventImg: cloudinaryUrl,
      };
      addEvent(addedEvent);
      Swal.fire({
        title: "Success!",
        text: "Add an event success",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: `Error: ${error}`,
        icon: "error",
      });
    }
  }
  function addGeolocation(
    payload: { lng: number; lat: number },
    address: string
  ) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      locations: {
        type: "Point",
        coordinates: [payload.lng, payload.lat],
      },
      location: address,
    }));
    console.log(formData.locations, `<<<formdata locations add event page`);
    console.log(formData.location, `<<<formdata location add event page`);
    console.log(payload.lng, payload.lat, `<<<formdata payload add event page`);
  }
  return (
    <main className="flex min-h-screen flex-col justify-center items-center gap-10 py-10 text-base-100">
      <h3 className="font-bold text-3xl">ADD EVENT</h3>
      <form
        action=""
        onSubmit={handleFormData}
        className="bg-base-100 w-8/12 h-auto flex flex-col border-2 p-4 gap-4 sm:gap-6 sm:p-6 justify-center items-center rounded-lg"
      >
        <div className="flex flex-col gap-1 w-8/12 ">
          <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">
            Event Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
          />
        </div>
        <div className="flex w-8/12 justify-center gap-4 flex-row justify-around">
          <div className="flex flex-col gap-1 self-center w-6/12">
            <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">
              Event starts
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
            />
          </div>
          <div className="flex flex-col gap-1 self-center w-6/12 ">
            <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">
              Event ends
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12 ">
          <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">
            Event Image
          </label>
          <CldUploadButton
            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
            uploadPreset="ml_default"
            signatureEndpoint="/api/cloudinary"
            onSuccess={(result) => {
              setCloudinaryUrl(
                (result?.info as CloudinaryUploadWidgetInfo)?.secure_url
              );
            }}
          />
        </div>
        <div></div>
        <div className="flex flex-col gap-1 self-center w-8/12 ">
          <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">
            Event location
          </label>
          <Map addGeolocation={addGeolocation} />
        </div>
        <button
          type="submit"
          className="bg-white rounded-lg w-3/6 xs:w-2/6 self-center p-2 mt-4"
        >
          Add Event
        </button>
      </form>
    </main>
  );
}
