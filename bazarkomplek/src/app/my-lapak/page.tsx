"use client"

import ProductCardWithEdit from "@/components/productCardWithEditBtn";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ConfirmationModalProps, productWithEvent } from "../interface";
import ProductCard from "@/components/productCard";
import Swal from "sweetalert2";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
            <div className="relative w-auto max-w-lg mx-auto my-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t-lg border-blueGray-200">
                    <h3 className="text-2xl font-semibold">Confirmation</h3>
                    <button onClick={onClose} className="text-black close-modal text-3xl">&times;</button>
                </div>
                <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Are you sure you want to <span className="font-bold">delete</span> this product? This action is irreversible
                    </p>
                    <div className="flex justify-end mt-6">
                        <button onClick={onClose} className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150">Cancel</button>
                        <button onClick={onConfirm} className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function MyLapak() {
    const [products, setProducts] = useState<productWithEvent[]>([]);
    const [filter, setFilter] = useState<string>("AVAILABLE");
    const [loading, setLoading] = useState<boolean>(true);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [selectedProductSlug, setSelectedProductSlug] = useState<string>('');

    const handleDeleteProduct = async (slug: string) => {
        try {
            setSelectedProductSlug(slug); 
            setShowConfirmationModal(true); 
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProductConfirmed = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/products/delete/${selectedProductSlug}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const data = await response.json();
                console.log(data, '<<<response');
            } else {
                Swal.fire({
                    title: 'Success',
                    text: 'Product has been deleted successfully',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
                fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    const fetchProducts = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/products/sellerId", {
                method: "GET",
                headers: {
                    'Cache-Control': 'no-store',
                }
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data, "<<<<response");
            }
            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

        const getButtonClass = (status: string) => {
        const baseClass = "rounded-lg p-2 min-w-16 md:min-w-24 border-2";
        const activeClass = filter === status ? "bg-accent text-white " : "bg-white text-accent";
        return `${baseClass} ${activeClass}`;
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products?.filter(product => product.status === filter);

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 py-10 text-base-100">
            <h3 className="font-bold text-3xl">MY LAPAK</h3>
            <div className="flex items-center justify-center w-5/6 md:w-3/6 sm:w-5/12 p-3 gap-5 bg-white rounded-lg text-xs md:text-lg font-bold border-2 shadow-lg">
                <p className="hidden lg:block text-accent">Status: </p>
                <button onClick={() => setFilter("AVAILABLE")} className={getButtonClass("AVAILABLE")}>
                    Available
                </button>
                <button onClick={() => setFilter("VERIFYING")} className={getButtonClass("VERIFYING")}>
                    Verifying
                </button>
                <button onClick={() => setFilter("UNAVAILABLE")} className={getButtonClass("UNAVAILABLE")}>
                    Sold
                </button>
            </div>

            <Link href={"/my-lapak/add-product"}>
                <button className="bg-base-100 text-white text-xl font-bold py-3 px-10 rounded-lg">
                    Add Product
                </button>
            </Link>

            {loading ? (
                <p className="text-base text-center md:text-xl">Loading...</p>
            ) : filteredProducts.length === 0 ? (
                <p className="text-base text-center md:text-xl">You have no products with status {filter.toLowerCase()}</p>
            ) : (
                filteredProducts.map((e, i) => (
                    e.status === "UNAVAILABLE" ? (
                        <ProductCard key={i} product={e} />
                    ) : (
                        <ProductCardWithEdit key={i} product={e} handleDeleteProduct={handleDeleteProduct}/>
                    )
                ))
            )}

<ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={() => {
                    deleteProductConfirmed();
                    setShowConfirmationModal(false);
                }}
            />
        </main>
    );
}
