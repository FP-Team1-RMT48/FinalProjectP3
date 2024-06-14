export default function AdminProductDetail() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-20 text-base-100">
      <h3 className="font-bold text-3xl">PRODUCT DETAIL</h3>
      <div className="flex flex-wrap w-3/4 min-h-[950px] md:min-h-[1050px] lg:min-h-[500px] lg:flex-nowrap rounded-lg shadow-lg">
        <div className="w-full lg:w-1/3 flex items-center justify-center rounded-lg">
          <img src="/logo.jpg" className="h-full w-full object-cover" alt="" />
        </div>
        <div className="w-full flex flex-col justify-between py-5 lg:w-2/3 px-4 lg:py-10">
          <div className="w-full flex flex-col gap-5">
            <p className=" font-bold">Product Name</p>
            <p className=" font-bold">Product Status</p>
            <select className="select bg-base-100 w-full text-primary">
              <option disabled selected>
                select status...
              </option>
              <option>Available</option>
              <option>Unavailable</option>
              <option>Verifying</option>
            </select>
            <p className=" font-bold">Product Price</p>
            <p className=" font-bold">Product Description</p>
          </div>

          <button className="w-full py-2 bg-base-100 text-primary rounded-lg">
            Add To Cart
          </button>
        </div>
      </div>
    </main>
  );
}
