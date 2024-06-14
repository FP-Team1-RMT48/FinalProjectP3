"use server"

import { truncateDescription } from "@/utils/truncateDescription"
import { cookies } from "next/headers"

export default async function AddProduct(){
    const categories = ["Elektronik", "Pakaian", "Anak-anak", "Alat Rumah Tangga", "Lain-lain"]
    const events = ["Event 1", "Event 2", "Event 3", "Event 4"]

    const handleAddProduct = async (formData: FormData) =>{
        "use server"
        try {
            // console.log(cookies().get("Authorization"))
            const description = formData.get("description") as string;
            const data = {
                name: formData.get("name"),
                image: formData.get("image"),
                description,
                excerpt: await truncateDescription(description),
                type: formData.get("type"),
                category: formData.get("category"),
                price: formData.get("price"),
                eventId: "666820d37f3639f0346488c8"
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (!response.ok){
                const data = await response.json()
                console.log(data, "<<<response")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
            <h3 className="font-bold text-3xl">ADD PRODUCT</h3>
            <form action={handleAddProduct} className="bg-base-100 w-11/12 h-auto flex flex-col border-2 p-4 gap-4 sm:gap-6 sm:p-6  rounded-lg">
            <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Name</label>
                    <input type="text" id="name" name="name" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"/>
                </div>
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Price</label>
                    <input type="text" id="price" name="price" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"/>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Type</label>
                    <select defaultValue={""} id="type" name="type" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg">
                        <option value="" disabled>Choose type here</option>
                        <option value="small">Small (Max 5kg)</option>
                        <option value="medium">Medium (Max 20kg)</option>
                        <option value="Large">Large (Max 100kg)</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Image</label>
                    <input type="text" id="image" name="image" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"/>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Categories</label>
                    <select defaultValue={""} id="category" name="category" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg">
                        <option value="" disabled>Choose Categories here</option>
                        {categories.map((e, i) => (
                            <option key={i} value={e}>{e}</option> 
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Select Event</label>
                    <select defaultValue={""} className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg">
                        <option value="" disabled>Choose Events here</option>
                        {events.map((e, i) => (
                            <option key={i} value={e}>{e}</option> 
                        ))}
                    </select>
                </div>
            </div>


                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Description</label>
                    <textarea id="description" name="description" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"/>
                </div>
                <button className="bg-white rounded-lg w-3/6 xs:w-2/6 self-center p-2 mt-4">
                    Add Product
                </button>
            </form>
        </main>
    )
}