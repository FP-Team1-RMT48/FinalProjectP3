"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Product, productWithEvent } from "@/app/interface";

export default function ProductCard({product}:{product: productWithEvent}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-5/6 gap-3 sm:gap-4 border-2 md:flex-row shadow-lg"
        >
            <div className="w-full h-36 sm:h-64 md:w-3/12">
                <img
                    src={product.image}
                    className="w-full h-full object-cover"
                    alt=""
                />
            </div>
            <div className="w-full flex px-2 sm:px-4 sm:text-xl md:py-4 md:w-9/12">
                <div className="w-5/6 flex flex-col gap-2 break-all">
                <p className="font-bold">
                Product Name : <span  className="font-normal">{product.name}</span>
            </p>
            <p className=" font-bold">Product Price : <span  className="font-normal">{product.price}</span></p>
            <p className="pb-4 font-bold">Product Description : <span  className="font-normal">{product.excerpt}</span></p>
                </div>
                <div className="h-full w-1/6 md:jusify-end md:items-start flex">
                    <button className="ml-auto">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
