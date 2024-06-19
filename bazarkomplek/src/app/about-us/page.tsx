"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <>
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
                <div>
        </div>
            </div>  
        </main>
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Security</a>
            <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
            <div className="grid grid-flow-col gap-4">
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                    >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                </a>
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                    >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                </a>
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                    >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                </a>
            </div>
        </nav>
        <aside>
            <p>
                Copyright © 2024 - All right reserved by Hacktiv8 Industries
                Ltd
            </p>
        </aside>
    </footer>
        </>
    );
}
