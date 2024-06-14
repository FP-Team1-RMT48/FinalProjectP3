"use client";

import { useEffect, useState } from "react";
import { Product } from "../interface";
import InfiniteScroll from "react-infinite-scroll-component";

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  async function getAll(page: number): Promise<Product[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/products?=${page}`
    );
    const result = await response.json();
    return result.data;
  }

  useEffect(() => {
    async function getProducts() {
      setProducts([]);
      setPage(1);
      setHasMore(true);
      const newProducts = await getAll(1);
      setProducts(newProducts);
      if (newProducts.length === 0) {
        setHasMore(false);
      }
    }
    getProducts();
  }, []);

  const paging = async () => {
    const nextPage = page + 1;
    const newProducts = await getAll(nextPage);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
    if (newProducts.length === 0) {
      setHasMore(false);
    }
  };
  return (
    <>
      <main className="flex min-h-screen flex-col p-10 ">
        <h1 className="text-xl text-center text-base-100 pb-5 font-bold">
          ADMIN Products
        </h1>
        <div className="overflow-x-auto">
          <InfiniteScroll
            dataLength={products.length}
            next={paging}
            hasMore={hasMore}
            loader={
              <h5 className="text-center text-base-100 pt-5 font-bold">
                Now loading...
              </h5>
            }
            endMessage={
              <p className="text-center text-base-100 pt-5 font-bold">
                No more, please stop
              </p>
            }
          >
            <table className="table text-base-100 border-2 border-base-100">
              <thead className="text-base-100">
                <tr className="">
                  <th>No.</th>
                  <th>Products</th>
                  <th>Event</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {products.map((e, idx) => {
                return (
                  <tbody key={idx}>
                    <tr>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`${e.image}`}
                                key={idx}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{e.name}</div>
                            <div className="text-sm opacity-50">
                              United States
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Zemlak, Daniel and Leannon
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Desktop Support Technician
                        </span>
                      </td>
                      <td>Purple</td>
                      <td>Purple</td>
                      <th>
                        <a href={`admin-products/${e.slug}`}>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </a>
                      </th>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </InfiniteScroll>
        </div>
      </main>
    </>
  );
}
