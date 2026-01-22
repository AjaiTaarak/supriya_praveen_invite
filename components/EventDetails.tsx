"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

interface EventDetailsProps {
    title: string;
    date: string;
    time: string;
    venueName: string;
    venueAddress: string;
    mapLink: string;
    showDecorations?: boolean;
}

export default function EventDetails({
    title,
    date,
    time,
    venueName,
    venueAddress,
    mapLink,
    showDecorations = true,
}: EventDetailsProps) {
    return (
        <section className="py-20 px-8 relative overflow-hidden">
            {/* Corner Decorations */}
            {showDecorations && (
                <>
                    <div className="absolute -top-10 -left-10 w-40 h-40 z-0 opacity-60 pointer-events-none">
                        <img src="/images/flower_design.png" alt="" className="w-full h-full object-contain rotate-90" />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 z-0 opacity-60 pointer-events-none">
                        <img src="/images/flower_design.png" alt="" className="w-full h-full object-contain -rotate-90" />
                    </div>
                </>
            )}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 text-center border p-8 border-maroon/20 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm"
            >
                <h3 className="text-3xl font-serif text-maroon font-bold mb-6">{title}</h3>

                <div className="space-y-4 mb-8 text-maroon/90">
                    <div className="flex flex-col items-center">
                        <span className="font-semibold text-gold uppercase text-xs tracking-wider mb-1">When</span>
                        <p className="text-lg">{date}</p>
                        <p className="text-base">{time}</p>
                    </div>

                    <div className="w-16 h-px bg-maroon/20 mx-auto my-4" />

                    <div className="flex flex-col items-center">
                        <span className="font-semibold text-gold uppercase text-xs tracking-wider mb-1">Where</span>
                        <p className="text-lg font-medium">{venueName}</p>
                        <p className="text-sm opacity-80 max-w-[250px] mx-auto">{venueAddress}</p>
                    </div>
                </div>

                <motion.a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-maroon text-cream px-6 py-3 rounded-full font-medium text-sm shadow-md hover:bg-maroon/90 transition-colors"
                >
                    <MapPin size={16} />
                    Navigate to Venue
                    <ArrowUpRight size={16} />
                </motion.a>
            </motion.div>
        </section>
    );
}
