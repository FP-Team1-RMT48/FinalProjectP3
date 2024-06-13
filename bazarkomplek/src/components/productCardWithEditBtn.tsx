"use client"

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";


export default function ProductCardWithEdit(){
return (
    <motion.div  initial={{opacity: 0, x: 70}} whileInView={{opacity: 1, x: 0}} transition={{ duration: 0.5}}  className="flex flex-col w-5/6 gap-3 sm:gap-4 border-2 md:flex-row shadow-lg">
    <div className="w-full h-36 sm:h-64 md:w-3/12">
        <img
            src="/logo.jpg"
            className="w-full h-full object-cover"
            alt=""
        />
    </div>
    <div className="w-full flex px-2 sm:px-4 sm:text-xl md:py-4 md:w-9/12">
        <div className="w-5/6 flex flex-col gap-2 break-all">
            <p>
                Product Name
            </p>
            <p className="pb-4">Product Price</p>
        </div>
        <div className="h-full w-1/6 md:justify-between md:items-start flex gap-6 flex-col">
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
        <button className="w-full mb-4 py-2 bg-base-100 text-primary rounded-full">Edit</button>
        </div>
    </div>
</motion.div>
)

}