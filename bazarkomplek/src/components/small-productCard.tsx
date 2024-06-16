"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/app/interface";
import formatCurrencyIDR from "@/utils/currencyConverter";

export default function SmallProductCard({
    index,
    product,
    eventSlug,
}: {
    index: number;
    product: Product;
    eventSlug: string;
}) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="card w-96 bg-base-100 shadow-xl image-full"
        >
            <figure>
                <img
                    src={product.image}
                    alt="product image"
                    className="w-full h-full object-cover"
                />  
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="">Price: {formatCurrencyIDR(product.price)}</p>
                <div className="card-actions justify-end">
                    {eventSlug && (
                        <Link href={`/${eventSlug}/${product.slug}`}>
                            <button className="btn btn-primary">
                                View Details
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
