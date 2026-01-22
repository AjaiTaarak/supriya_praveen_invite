"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import DecorativeBorder from "./DecorativeBorder";

interface PersonDetails {
    name: string;
    degree?: string;
    parents?: string;
    jobTitle?: string;
    company?: string;
}

interface CoupleDetailsProps {
    bride: PersonDetails;
    groom: PersonDetails;
}

export default function CoupleDetails({ bride, groom }: CoupleDetailsProps) {
    return (
        <section className="min-h-[60vh] flex flex-col items-center justify-center bg-cream py-20 px-4 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                {/* Could add a subtle pattern here if needed */}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-lg z-10 px-6 pb-24" // Added padding bottom to prevent cut-off
            >
                <div className="flex flex-col items-center gap-1">
                    {/* Animated Header */}
                    <div className="w-48 h-48 relative mb-6">
                        <Image
                            src="/images/couple_animation_heart.svg"
                            alt="Couple Animation"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>

                    {/* Bride Section */}
                    <div className="text-center">
                        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-1 block">
                            The Bride
                        </span>
                        <h2 className="text-3xl md:text-4xl text-maroon font-serif font-bold mb-1">
                            {bride.name}
                            {bride.degree && <span className="text-lg md:text-xl font-sans font-medium opacity-70 ml-2">{bride.degree}</span>}
                        </h2>
                        {bride.parents && <p className="text-maroon/70 text-sm md:text-base italic font-serif mb-1">{bride.parents}</p>}

                        {(bride.jobTitle || bride.company) && (
                            <div className="text-maroon/80 font-sans">
                                {bride.jobTitle && <p className="font-medium">{bride.jobTitle}</p>}
                                {bride.company && <p className="opacity-80">{bride.company}</p>}
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center -my-1">
                        <span className="text-gold font-serif text-3xl font-light italic">&</span>
                    </div>

                    {/* Groom Section */}
                    <div className="text-center">
                        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-1 block">
                            The Groom
                        </span>
                        <h2 className="text-3xl md:text-4xl text-maroon font-serif font-bold mb-1">
                            {groom.name}
                            {groom.degree && <span className="text-lg md:text-xl font-sans font-medium opacity-70 ml-2">{groom.degree}</span>}
                        </h2>
                        {groom.parents && <p className="text-maroon/70 text-sm md:text-base italic font-serif mb-1">{groom.parents}</p>}

                        {(groom.jobTitle || groom.company) && (
                            <div className="text-maroon/80 font-sans">
                                {groom.jobTitle && <p className="font-medium">{groom.jobTitle}</p>}
                                {groom.company && <p className="opacity-80">{groom.company}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Bottom Border - Anchored to absolute bottom */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center pb-1">
                <DecorativeBorder className="w-64 opacity-30" />
            </div>
        </section>
    );
}
