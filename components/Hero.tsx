"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";
import DecorativeBorder from "./DecorativeBorder";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface HeroProps {
    brideName?: string;
    groomName?: string;
    date?: string;
}

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/couple_2.jpeg"
                    alt="Supriya & Praveen"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/70 to-cream/90" />
            </motion.div>

            {/* Garland Decoration */}
            <div className="absolute top-0 w-full z-20 flex justify-center pointer-events-none">
                <Image
                    src="/images/garland_art_1.svg"
                    alt="Garland"
                    width={750}
                    height={300}
                    className="w-full max-w-[450px] object-contain drop-shadow-md scale-[1.15] origin-top"
                />
            </div>

            <div className="z-10 flex flex-col items-center px-8 w-full max-w-2xl pt-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mb-8"
                >
                    <Image
                        src="/images/ganesh.png"
                        alt="Lord Ganesha"
                        width={80}
                        height={80}
                        className="drop-shadow-sm opacity-90"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1
                        className={`${playfair.className} text-4xl md:text-5xl text-maroon font-bold mb-4 leading-tight tracking-wide`}
                    >
                        We cordially invite you <br />
                        <span className="text-3xl md:text-4xl block mt-4 font-normal italic text-maroon/80">
                            to the wedding of
                        </span>
                    </h1>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity, repeatType: "loop" }}
                className="absolute bottom-8 z-10 text-maroon/50"
            >
                <p className="text-[10px] uppercase tracking-widest mb-2">Scroll Down</p>
                <div className="w-px h-8 bg-maroon/50 mx-auto" />
            </motion.div>
        </section>
    );
}
