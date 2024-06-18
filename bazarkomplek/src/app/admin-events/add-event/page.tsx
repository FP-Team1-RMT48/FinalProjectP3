"use client";

import { addEvent } from "@/app/action";
import { Map } from "@/components/map";
import { useState } from "react";

export default function AddEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    coordinates: {
      type: "Point",
      coordinates: [0, 0],
    },
    eventImg: "",
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
      addEvent(formData);
    } catch (error) {}
  }
  function addGeolocation(
    payload: { lat: number; lng: number }, address: string

  ) {
    console.log(payload, `,<<PAYLOAD`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      coordinates: {
        type: "Point",
        coordinates: [payload.lat, payload.lng],
      },
      location: address,
    }));
    //simpen ke data event
  }
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
      <h3 className="font-bold text-3xl">ADD EVENT</h3>
      <form
        action=""
        onSubmit={handleFormData}
        className="bg-base-100 w-11/12 h-auto flex flex-col border-2 p-4 gap-4 sm:gap-6 sm:p-6  rounded-lg"
      >
        <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
          <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12 ">
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
        </div>
        <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
          <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
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
          <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
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
          <input
            type="text"
            name="eventImg"
            onChange={handleChange}
            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
          />
        </div>
        <div>
        </div>
        <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12 ">
          <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">
            Event location
          </label>
          <Map addGeolocation={addGeolocation} />
          {/* <textarea
            name="location"
            onChange={handleChange}
            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
          /> */}
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
