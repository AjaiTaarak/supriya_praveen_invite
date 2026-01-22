"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutProps {
    name: string;
    degree?: string;
    parents?: string;
    role: "Bride" | "Groom";
    bio: string;
    imageSrc?: string;
    delay?: number;
}

export default function About({ name, degree, parents, role, bio, imageSrc, delay = 0 }: AboutProps) {
    return (
        <section className="min-h-screen flex flex-col relative bg-cream">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <Image
                    src="/images/hand-drawn-flowers-background.png"
                    alt="Floral Background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Image Section - Takes top half on mobile, full height background or side on desktop if we wanted, but sticking to mobile-first container */}
            <div className="relative w-full h-[60vh]">
                {imageSrc ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="w-full h-full"
                    >
                        <Image
                            src={imageSrc}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay for text readability at bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream via-cream/50 to-transparent" />
                    </motion.div>
                ) : (
                    <div className="w-full h-full bg-maroon/10 flex items-center justify-center text-maroon/30">
                        Photo
                    </div>
                )}
            </div>

            {/* Content Section - Bottom half */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 px-8 pb-16 pt-4 text-center -mt-12"
            >
                <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-2 block shadow-black drop-shadow-sm">
                    The {role}
                </span>
                <div className="mb-6">
                    <h2 className="text-4xl text-maroon font-serif font-bold leading-tight">
                        {name}
                        {degree && <span className="block text-xl font-sans font-medium mt-1 opacity-80">{degree}</span>}
                    </h2>
                    {parents && <p className="text-maroon/70 text-sm mt-2 italic font-serif">{parents}</p>}
                </div>

                <div className="w-16 h-1 bg-gold mx-auto mb-6" />
                <p className="text-maroon/80 leading-relaxed font-sans text-base md:text-lg">
                    {bio}
                </p>
            </motion.div>
        </section>
    );
}
