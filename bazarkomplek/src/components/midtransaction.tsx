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
      "bg-base-100 text-white text-xs md:text-xl font-bold py-3 px-10 rounded-lg";
    const statusClass = filter === "DRAFT" ? "block" : "hidden";
    return `${baseClass} ${statusClass}`;
  };

  const handleOnBuy = async () => {
    const result = await getPrice(
      transaction.productDetail.price,
      transaction._id
    );
    router.push(result.redirect_url);
  };
  return (
    <button className={checkoutButtonStatus()} onClick={handleOnBuy}>
      Checkout
    </button>
  );
}
