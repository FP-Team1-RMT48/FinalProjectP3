"use client";

import { useEffect, useState } from "react";
import { truncateDescription } from "@/utils/truncateDescription";
import { ConfirmationModalProps, Event } from "@/app/interface";
import { fetchProductDetail, fetchUpcomingEvents } from "@/app/action";
import { useRouter } from "next/navigation";
import {
    CldUploadButton,
    CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import Swal from "sweetalert2";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
            <div className="relative w-auto max-w-lg mx-auto my-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t-lg border-blueGray-200">
                    <h3 className="text-2xl font-semibold">Confirmation</h3>
                    <button
                        onClick={onClose}
                        className="text-black close-modal text-3xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Are you sure you want to mark this product as{" "}
                        <span className="font-bold">Unavailable</span>? This
                        action is irreversible
                    </p>
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={onClose}
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function EditProduct({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const categories = [
        "Elektronik",
        "Pakaian",
        "Anak-anak",
        "Alat Rumah Tangga",
        "Lain-lain",
    ];
    const [events, setEvents] = useState<Event[]>([]);
    const [cloudinaryUrl, setCloudinaryUrl] = useState<string>("");
    const [formData, setFormData] = useState({
        name: "",
        image: cloudinaryUrl ? cloudinaryUrl : "",
        description: "",
        type: "",
        category: "",
        price: "",
        eventId: "",
        status: "",
    });
    const [showConfirmationModal, setShowConfirmationModal] =
        useState<boolean>(false);

    const router = useRouter();

    const fetchEventsOption = async () => {
        const data = await fetchUpcomingEvents();
        setEvents(data);
    };

    const fetchProduct = async () => {
        const data = await fetchProductDetail(slug);
        const {
            name,
            image,
            description,
            type,
            category,
            price,
            eventId,
            status,
        } = data;
        const priceString = price.toString();
        const eventIdString = eventId.toString();
        setFormData({
            name,
            image,
            description,
            type,
            category,
            price: priceString,
            eventId: eventIdString,
            status,
        });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const description = formData.description;
            const defaultImage = formData.image;
            const data = {
                ...formData,
                excerpt: await truncateDescription(description),
                image: cloudinaryUrl ? cloudinaryUrl : defaultImage,
            };
            if (formData.status === "UNAVAILABLE") {
                setShowConfirmationModal(true);
            } else {
                await submitForm(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submitForm = async (data: any) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}api/products/edit/${slug}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw data
            }
            Swal.fire({
                title: "Success",
                text: "Product has been edited successfully",
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
        fetchProduct();
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
            <h3 className="font-bold text-3xl">EDIT PRODUCT</h3>
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
                            Change Product Image
                        </label>
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

                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label
                        htmlFor="status"
                        className="text-xs pl-2 text-white lg:text-base"
                    >
                        Select Product Status
                    </label>
                    <select
                        id="eventId"
                        onChange={handleChange}
                        value={formData.status}
                        name="status"
                        className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"
                    >
                        <option value="VERIFYING">AVAILABLE</option>
                        <option value="UNAVAILABLE">UNAVAILABLE</option>
                    </select>
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
                    Edit Product
                </button>
            </form>
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={() => {
                    submitForm(formData);
                    setShowConfirmationModal(false);
                }}
            />
        </main>
    );
}
