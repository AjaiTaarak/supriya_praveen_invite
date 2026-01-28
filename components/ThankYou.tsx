"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DecorativeBorder from "./DecorativeBorder";
import RSVPDialog from "./RSVPDialog";

export default function ThankYou() {
    const [isRSVPOpen, setIsRSVPOpen] = useState(false);

    return (
        <section className="py-24 px-8 text-center bg-[#2f3e2e] text-cream relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full text-gold/20">
                <DecorativeBorder />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="z-10 relative"
            >
                <h2 className="text-4xl font-serif font-bold mb-6 text-gold">Thank You</h2>
                <p className="text-lg font-light opacity-90 leading-relaxed max-w-xs mx-auto mb-8">
                    We can't wait to celebrate our special day with you! Your presence means the world to us.
                </p>

                <div className="text-2xl font-serif italic text-gold mb-8">
                    Supriya & Praveen
                </div>

                {/* RSVP Button */}
                <motion.button
                    onClick={() => setIsRSVPOpen(true)}
                    className="bg-gradient-to-r from-gold to-gold/90 text-maroon font-bold py-3 px-8 rounded-full hover:from-gold/90 hover:to-gold transition-all shadow-lg hover:shadow-xl active:scale-95 mb-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    RSVP Now
                </motion.button>

                <div className="mt-8">
                    <img src="/images/rangoli_simple_lines.svg" alt="Rangoli" className="w-32 h-auto mx-auto invert opacity-80" />
                </div>
            </motion.div>

            {/* RSVP Dialog */}
            <RSVPDialog isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />

            {/* Decorative Bottom Pattern */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gold opacity-30" />
        </section>
    );
}
