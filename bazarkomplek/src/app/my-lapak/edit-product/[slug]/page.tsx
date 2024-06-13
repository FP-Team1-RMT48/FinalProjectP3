export default function EditProduct(){
    const categories = ["Elektronik", "Pakaian", "Anak-anak", "Alat Rumah Tangga", "Lain-lain"]
    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
            <h3 className="font-bold text-3xl">EDIT PRODUCT</h3>
            <form action=""className="bg-base-100 w-11/12 h-auto flex flex-col border-2 p-4 gap-4 sm:gap-6 sm:p-6  rounded-lg">
            <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Name</label>
                    <input type="text" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"/>
                </div>
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Price</label>
                    <input type="text" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"/>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-evenly">
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Type</label>
                    <select defaultValue={""} className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg">
                        <option value="" disabled>Choose type here</option>
                        <option value="small">Small (Max 5kg)</option>
                        <option value="medium">Medium (Max 20kg)</option>
                        <option value="Large">Large (Max 100kg)</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Image</label>
                    <input type="text" className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"/>
                </div>
            </div>
            <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-5/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Categories</label>
                    <select defaultValue={""} className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg">
                        <option value="" disabled>Choose Categories here</option>
                        {categories.map((e, i) => (
                            <option key={i} value={e}>{e}</option> 
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1 xs:w-5/6 xs:self-center lg:w-8/12 ">
                    <label htmlFor="" className="text-xs pl-2 text-white lg:text-base">Product Description</label>
                    <textarea className="text-sm py-1 pl-2 w-full bg-white text-base-100 rounded-md md:text-base lg:text-lg"/>
                </div>
                <button className="bg-white rounded-lg w-3/6 xs:w-2/6 self-center p-2 mt-4">
                    Edit Product
                </button>
            </form>
        </main>
    )
}