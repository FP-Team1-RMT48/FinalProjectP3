"use client";
import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";
import { TransactionWithProductDetail } from "../interface";
import TransactionCard from "@/components/transactionCard";
import { Midtransaction } from "@/components/midtransaction";

export default function MyOrders({ params }: { params: { price: string } }) {
  const [orders, setOrders] = useState<TransactionWithProductDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("DRAFT");
  const [price, setPrice] = useState<number>(0);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/transactions/buyerId`
      );
      const data = await response.json();
      if (!response.ok) {
        return console.log(data, "<response");
      }
      setOrders(data.transactions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/transactions/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(await response.json());
      }
      console.log("remove success");
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const getPrice = async (price: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/midtrans`,
        {
          method: "POST",
          body: JSON.stringify({ price: price }),
        }
      );
      if (!response.ok) {
        throw new Error(await response.json());
      }
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutButtonStatus = () => {
    const baseClass =
      "bg-base-100 text-white text-xl font-bold py-3 px-10 rounded-lg";
    const statusClass = filter === "DRAFT" ? "block" : "hidden";
    return `${baseClass} ${statusClass}`;
  };

  const getButtonClass = (status: string) => {
    const baseClass = "rounded-lg p-2 min-w-16 md:min-w-24 border-2";
    const activeClass =
      filter === status ? "bg-accent text-white " : "bg-white text-accent";
    return `${baseClass} ${activeClass}`;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredTransactions = orders?.filter(
    (product) => product.status === filter
  );
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
      <h3 className="font-bold text-3xl">MY ORDERS</h3>
      <div className="flex justify-center w-full sm:w-5/6 lg:w-4/6 xl:w-3/6 p-3 gap-3 lg:gap-5 bg-white rounded-lg text-xs md:text-lg font-bold border-2 shadow-lg">
        <p className="py-2 hidden sm:block text-accent">Status: </p>
        <button
          onClick={() => setFilter("DRAFT")}
          className={getButtonClass("DRAFT")}
        >
          Cart
        </button>
        <button
          onClick={() => setFilter("PENDING")}
          className={getButtonClass("PENDING")}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("CANCELLED")}
          className={getButtonClass("CANCELLED")}
        >
          Cancelled
        </button>
        <button
          onClick={() => setFilter("COMPLETED")}
          className={getButtonClass("COMPLETED")}
        >
          Completed
        </button>
      </div>
      {filteredTransactions.map((e, idx) => (
        <Midtransaction
          key={idx}
          filter={filter}
          getPrice={getPrice}
          transaction={e}
        />
      ))}

      {loading ? (
        <p className="text-base text-center md:text-xl">Loading...</p>
      ) : filteredTransactions.length === 0 ? (
        <p className="text-base text-center md:text-xl">
          You have no orders with status {filter.toLowerCase()}
        </p>
      ) : (
        filteredTransactions.map((e, i) => (
          <TransactionCard
            key={i}
            transaction={e}
            handleRemoveProduct={handleRemoveProduct}
          />
        ))
      )}
    </main>
  );
}
