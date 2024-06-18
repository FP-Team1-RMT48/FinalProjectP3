"use client";

import { useEffect, useState } from "react";
import { truncateDescription } from "@/utils/truncateDescription";
import { Event } from "@/app/interface";
import { fetchUpcomingEvents } from "@/app/action";
import { useRouter } from "next/navigation";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Swal from "sweetalert2";

export default function AddProduct() {
    const categories = [
        "Elektronik",
        "Pakaian",
        "Anak-anak",
        "Alat Rumah Tangga",
        "Lain-lain",
    ];
    const [events, setEvents] = useState<Event[]>([]);
    const [cloudinaryUrl, setCloudinaryUrl] = useState<any>();
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        type: "",
        category: "",
        price: "",
        eventId: "",
    });

    const router = useRouter();

    const fetchEventsOption = async () => {
        const data = await fetchUpcomingEvents();
        setEvents(data);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const description = formData.description;
            const data = {
                ...formData,
                excerpt: await truncateDescription(description),
                image: cloudinaryUrl,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}api/products/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw data;
            }
            Swal.fire({
                title: "Success",
                text: "Product has been added to your Lapak successfully",
                icon: "success",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
            router.push("/my-lapak");
        } catch (error) {
            if (
                typeof error === "object" &&
                error !== null &&
                "error" in error
            ) {
                Swal.fire({
                    title: "Error",
                    text: `${error.error}`,
                    icon: "error",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
            } else {
                console.log(error)
            }
        }
    };

    useEffect(() => {
        fetchEventsOption();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
            <h3 className="font-bold text-3xl">ADD PRODUCT</h3>
            <form
                onSubmit={handleSubmit}
                className="bg-base-100 w-11/12 h-auto flex flex-col border-2 p-4 gap-4 sm:gap-6 sm:p-6  rounded-lg"
            >
                <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
                    <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                        <label
                            htmlFor="name"
                            className="text-xs pl-2 text-white lg:text-base"
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                        />
                    </div>
                    <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                        <label
                            htmlFor="price"
                            className="text-xs pl-2 text-white lg:text-base"
                        >
                            Product Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
                    <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                        <label
                            htmlFor="type"
                            className="text-xs pl-2 text-white lg:text-base"
                        >
                            Product Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                        >
                            <option value="" disabled>
                                Choose type here
                            </option>
                            <option value="small">Small (Max 5kg)</option>
                            <option value="medium">Medium (Max 20kg)</option>
                            <option value="large">Large (Max 100kg)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                        <label
                            htmlFor="image"
                            className="text-xs pl-2 text-white lg:text-base"
                        >
                            Product Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            className="hidden text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                        />
                        <CldUploadButton
                            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                            uploadPreset="ml_default"
                            signatureEndpoint="/api/cloudinary"
                            onSuccess={(result) => {
                                setCloudinaryUrl(
                                    (result?.info as CloudinaryUploadWidgetInfo)
                                        ?.secure_url
                                );
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
                    <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                        <label
                            htmlFor="category"
                            className="text-xs pl-2 text-white lg:text-base"
                        >
                            Product Categories
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                        >
                            <option value="" disabled>
                                Choose Categories here
                            </option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                        <label
                            htmlFor="event"
                            className="text-xs pl-2 text-white lg:text-base"
                        >
                            Select Event
                        </label>
                        <select
                            id="eventId"
                            onChange={handleChange}
                            value={formData.eventId}
                            name="eventId"
                            className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                        >
                            <option value="" disabled>
                                Choose Events here
                            </option>
                            {events.map((event, index) => (
                                <option key={index} value={event._id}>
                                    {event.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12 ">
                    <label
                        htmlFor="description"
                        className="text-xs pl-2 text-white lg:text-base"
                    >
                        Product Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-white rounded-lg w-3/6 xs:w-2/6 self-center p-2 mt-4"
                >
                    Add Product
                </button>
            </form>
        </main>
    );
}
