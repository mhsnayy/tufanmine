"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export const HomeContent = () => {
    return (
        <div className="z-10 text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
            >
                <h1 className="text-5xl md:text-7xl font-playfair text-white leading-tight">
                    Tufan <span className="text-neutral-500 italic">&</span> Mine
                </h1>
                <p className="text-neutral-400 text-sm uppercase tracking-[0.3em] font-light">
                    Dijital Albüm
                </p>
                <div className="h-px w-24 bg-linear-to-r from-transparent via-neutral-700 to-transparent mx-auto my-8" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            >
                <Link
                    href="/wedding"
                    className="group relative w-40 py-3 px-6 rounded-full bg-white text-black border border-white hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                    <span className="relative z-10 font-medium tracking-wide">Düğün</span>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-0 right-0 text-center text-neutral-600 text-xs font-light tracking-widest"
            >
                Tufan & Mine 2020 - ∞
            </motion.div>
        </div>
    );
};