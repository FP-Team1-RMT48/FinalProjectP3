"use client";
import { Product, TransactionWithProductDetail } from "@/app/interface";
import { get } from "lodash";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

export function Midtransaction({
  filter,
  getPrice,
  transaction,
}: {
  filter: string;
  getPrice: any;
  transaction: TransactionWithProductDetail;
}) {
  const router = useRouter();

  const checkoutButtonStatus = () => {
    const baseClass =
      "bg-base-100 text-white text-xl font-bold py-3 px-10 rounded-lg";
    const statusClass = filter === "DRAFT" ? "block" : "hidden";
    return `${baseClass} ${statusClass}`;
  };

  const handleOnBuy = async () => {
    const result = await getPrice(transaction.productDetail.price);
    console.log(result, "<result")
    router.push(result.payment_url);
  };

  const cart = async () => {
    const data = {
      _id: "string",
      name: "string",
      price: 0,
      description: "string",
      productImg: "string",
      stock: 0,
      category: "string",
      productSlug: "string",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/midtrans`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {}
  };
  return (
    <button className={checkoutButtonStatus()} onClick={handleOnBuy}>
      Checkout
    </button>
  );
}
