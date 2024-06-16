"use client";

import { useEffect, useState } from "react";
import { fetchProductDetail } from "@/app/action";
import { useRouter } from "next/navigation";
import { truncateDescription } from "@/utils/truncateDescription";

export default function EditAdminProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  console.log(slug);
  const statusOptions = ["AVAILABLE", "UNAVAILABLE", "VERIFYING"];
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    type: "",
    category: "",
    price: 0,
    status: "",
  });

  const router = useRouter();

  const fetchProduct = async () => {
    const data = await fetchProductDetail(slug);
    const { name, image, description, type, category, price, status } = data;
    setFormData({
      name,
      image,
      description,
      type,
      category,
      price,
      status,
    });
  };

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "price" ? Number(value) : value,
    }));
  }

  async function handleFormData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const description = formData.description;
      const data = {
        ...formData,
        excerpt: await truncateDescription(description),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/products/edit/${slug}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        return console.log(data);
      }
      router.push("/admin-products");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-20 text-base-100">
      <h3 className="font-bold text-3xl">PRODUCT DETAIL</h3>
      <div className="flex flex-wrap w-3/4 min-h-[950px] md:min-h-[1050px] lg:min-h-[500px] lg:flex-nowrap rounded-lg shadow-lg">
        <div className="w-full lg:w-1/3 flex items-center justify-center rounded-lg">
          <img
            src={formData.image ? formData.image : "/logo.jpg"}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="w-full flex flex-col justify-between py-5 lg:w-2/3 px-4 lg:py-10">
          <div className="w-full flex flex-col gap-5">
            <form
              onSubmit={handleFormData}
              className="w-full flex flex-col gap-5"
            >
              <p className="font-bold">Product Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                disabled
                className="input bg-base-100 w-full text-primary"
              />
              <p className="font-bold">Product Status</p>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select bg-base-100 w-full text-primary"
              >
                <option disabled value="">
                  select status...
                </option>
                {statusOptions.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
              <p className="font-bold">Product Price</p>
              <input
                type="number"
                name="price"
                value={formData.price}
                disabled
                className="input bg-base-100 w-full text-primary"
              />
              <p className="font-bold">Product Description</p>
              <textarea
                name="description"
                value={formData.description}
                disabled
                className="textarea bg-base-100 w-full text-primary"
              ></textarea>
              <button
                type="submit"
                className="w-full py-2 bg-base-100 text-primary rounded-lg"
              >
                Edit Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
