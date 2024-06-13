"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <main className="flex min-h-screen justify-center items-center flex-col gap-10 py-10 text-base-100 w-full">
            <div className="w-5/6 max-w-7xl p-4">
                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className="flex items-center"
                    >
                        <img
                            src="/about-us/market.jpg"
                            alt="Tentang Kami"
                            className="mr-4 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] lg:w-[400px] lg:h-[400px] object-cover"
                        />
                        <div className="mr-auto w-5/6 md:w-3/6">
                            <h2 className="text-xl lg:text-3xl font-semibold">
                                Tentang Kami - BazarKomplek
                            </h2>
                            <p className="text-sm md:text-base text-gray-700 mt-4">
                                BazarKomplek adalah solusi inovatif yang
                                mengkombinasikan event-event garage sale dari
                                komplek ke komplek.
                            </p>
                        </div>
                    </motion.div>
                </section>

                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: 70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.4 }}
                        className="flex items-center"
                    >
                        <div className="text-end ml-auto w-5/6 md:w-3/6">
                            <h2 className="text-xl lg:text-3xl font-semibold">
                                Misi
                            </h2>
                            <p className="text-sm md:text-base text-gray-700 mt-4">
                                BazarKomplek hadir untuk memberikan pengalaman
                                baru untuk event jual beli barang pre-loved
                                secara online dan offline (on-site) di komplek
                                terdekat Anda.
                            </p>
                        </div>
                        <img
                            src="/about-us/preloved.jpg"
                            alt="Misi"
                            className="ml-4 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] lg:w-[400px] lg:h-[400px]"
                        />
                    </motion.div>
                </section>

                <section>
                    <h2 className="text-lg text-center sm:text-xl lg:text-3xl font-semibold mb-4 lg:mb-12 lg:mt-32">
                        Apa yang Membuat BazarKomplek Unik?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src="/about-us/van.jpg"
                                alt="Event Garage Sale yang Terorganisir"
                                className="mb-4 w-[200px] h-[100px] lg:w-[400px] lg:h-[200px] object-cover"
                            />
                            <div className="text-center">
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    Event Garage Sale yang Terorganisir
                                </h3>
                                <p className="text-gray-700 mt-2">
                                    Kami memberikan ide dan pengalaman event
                                    garage sale di berbagai komplek, menciptakan
                                    pengalaman belanja yang seru dan
                                    terorganisir dengan baik.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src="/about-us/laptop.jpg"
                                alt="Layanan Logistik & Verifikasi Profesional"
                                width={150}
                                height={150}
                                className="mb-4 w-[200px] h-[100px] lg:w-[400px] lg:h-[200px] object-cover"
                            />
                            <div className="text-center">
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    Layanan Logistik & Verifikasi Profesional
                                </h3>
                                <p className="text-gray-700 mt-2">
                                    Setiap transaksi didukung dengan logistik
                                    yang handal dan tim verifikator yang
                                    memastikan barang-barang terdaftar, yang
                                    siap kirim, dan dijual dengan akurat.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src="/about-us/bazaar.jpg"
                                alt="Pengalaman Transaksi Hybrid"
                                width={150}
                                height={150}
                                className="mb-4 w-[200px] h-[100px] lg:w-[400px] lg:h-[200px] object-cover"
                            />
                            <div className="text-center">
                                <h3 className="text-lg sm:text-xl  font-semibold">
                                    Pengalaman Transaksi Hybrid
                                </h3>
                                <p className="text-gray-700 mt-2">
                                    Bazar berbasis online dan offline memberikan
                                    fleksibilitas ekstra. Terjadwal event onsite
                                    dan dukungan platform digital memastikan
                                    Anda tidak ketinggalan event, dimanapun Anda
                                    berada. Nikmati pengalaman belanja dan jual
                                    beli yang mudah sesuai kebutuhan Anda.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src="/about-us/community.jpg"
                                alt="Komunitas Inklusif"
                                width={150}
                                height={150}
                                className="mb-4 w-[200px] h-[100px] lg:w-[400px] lg:h-[200px] object-cover"
                            />
                            <div className="text-center">
                                <h3 className="text-lg sm:text-xl  font-semibold">
                                    Komunitas Inklusif
                                </h3>
                                <p className="text-gray-700 mt-2">
                                    Kami menyatukan komunitas dari para pecinta
                                    preloved hingga gadget lama, semuanya bisa
                                    bertemu dan berbagi pengalaman di
                                    BazarKomplek.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </main>
    );
}
