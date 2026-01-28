"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db, serverTimestamp } from "../lib/firebase";

const WEDDING_ID = "supriya_praveen_21_02_2026";

interface RSVPDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RSVPDialog({ isOpen, onClose }: RSVPDialogProps) {
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            await addDoc(collection(db, "rsvp"), {
                weddingId: WEDDING_ID,
                name: name.trim(),
                numberofguests: guests,
                timestamp: serverTimestamp(),
            });

            onClose();
            setName("");
            setGuests(1);
        } catch (error) {
            console.error("RSVP submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-cream rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl text-maroon/50 hover:text-maroon transition-colors"
                    aria-label="Close dialog"
                >
                    ×
                </button>

                <h2 className="text-3xl font-serif font-bold mb-6 text-center text-maroon">
                    RSVP
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <label className="text-sm font-semibold text-maroon">
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-2 w-full px-4 py-3 border-2 border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white text-maroon"
                            placeholder="Your Name"
                        />
                    </label>

                    <label className="text-sm font-semibold text-maroon">
                        Number of guests
                        <div className="mt-2 w-full flex items-center justify-center gap-6">
                            <button
                                type="button"
                                aria-label="Decrease guests"
                                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                                className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 border-gold/30 bg-white text-2xl font-bold text-maroon focus:outline-none focus:ring-2 focus:ring-gold active:scale-95 transition-all ${guests <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gold/10"
                                    }`}
                                disabled={guests <= 1}
                            >
                                −
                            </button>

                            <div
                                className="min-w-[3rem] text-center text-2xl font-bold text-maroon select-none"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {guests}
                            </div>

                            <button
                                type="button"
                                aria-label="Increase guests"
                                onClick={() => setGuests((prev) => Math.min(10, prev + 1))}
                                className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 border-gold/30 bg-white text-2xl font-bold text-maroon focus:outline-none focus:ring-2 focus:ring-gold active:scale-95 transition-all ${guests >= 10 ? "opacity-50 cursor-not-allowed" : "hover:bg-gold/10"
                                    }`}
                                disabled={guests >= 10}
                            >
                                +
                            </button>
                        </div>
                    </label>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-full bg-gradient-to-r from-maroon to-maroon/90 text-cream font-bold py-3 px-6 rounded-full hover:from-maroon/90 hover:to-maroon transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Submitting..." : "Submit RSVP"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
