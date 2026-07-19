import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import * as motion from "framer-motion/client";

// Font yapılandırmasını burada da çağırıyoruz (veya layout'tan miras alabilir)
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-playfair"
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-inter"
});

export default function WeddingPage() {
    return (
        <main className={`min-h-screen bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden ${inter.variable} ${playfair.variable}`}>

            {/* --- Atmosferik Arka Plan (Ana sayfayla tutarlılık için) --- */}
            <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* --- Merkez İçerik --- */}
            <div className="z-10 flex flex-col items-center text-center px-6">

                {/* Başlık Bloğu */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-playfair text-white tracking-tight">
                        Tufan & Mine
                    </h1>

                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-8 bg-neutral-700" />
                        <span className="text-neutral-500 font-playfair italic text-lg">Düğün Albümü</span>
                        <div className="h-px w-8 bg-neutral-700" />
                    </div>
                </motion.div>

                {/* "Yakında" İndikatörü */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-12 relative"
                >
                    {/* Arkadaki hafif pulse efekti */}
                    <div className="absolute inset-0 bg-white/5 blur-xl rounded-full animate-pulse" />

                    <div className="relative border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm px-8 py-4 rounded-full">
                        <span className="text-neutral-200 uppercase tracking-[0.4em] text-sm font-light">
                            Çok Yakında...
                        </span>
                    </div>
                </motion.div>



            </div>
        </main>
    )
}