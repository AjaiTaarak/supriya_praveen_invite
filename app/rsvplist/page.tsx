"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { FaUsers, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const WEDDING_ID = "supriya_praveen_21_02_2026";

interface RSVPData {
    id: string;
    name: string;
    numberofguests: number;
    timestamp: Date;
    weddingId: string;
}

export default function RSVPListPage() {
    const [rsvpData, setRsvpData] = useState<RSVPData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRSVPData();
    }, []);

    const fetchRSVPData = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(db, "rsvp"),
                where("weddingId", "==", WEDDING_ID),
                orderBy("timestamp", "desc")
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate?.() || new Date(),
            })) as RSVPData[];
            setRsvpData(data);
        } catch (err) {
            console.error("Error fetching RSVP data:", err);
            setError("Failed to load RSVP data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp: Date) => {
        if (!timestamp) return "N/A";
        return new Intl.DateTimeFormat("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(timestamp);
    };

    const totalGuests = rsvpData.reduce(
        (sum, rsvp) => sum + (rsvp.numberofguests || 0),
        0
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-maroon mx-auto mb-4"></div>
                    <p className="text-maroon font-semibold">Loading RSVP data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="text-center">
                    <p className="text-red-600 mb-4 font-semibold">{error}</p>
                    <button
                        onClick={fetchRSVPData}
                        className="px-6 py-3 bg-maroon text-cream rounded-lg hover:bg-maroon/90 transition-colors shadow-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream">
            <div className="w-full max-w-2xl mx-auto min-h-screen shadow-2xl flex flex-col bg-cream">
                {/* Header */}
                <motion.header
                    className="bg-gradient-to-br from-maroon to-maroon/90 text-cream p-8 text-center relative overflow-hidden"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="relative z-10">
                        <Link
                            href="/"
                            className="absolute left-4 top-8 text-cream hover:text-gold transition-colors"
                        >
                            <FaArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-serif font-bold mb-2">RSVP Responses</h1>
                        <p className="text-cream/90 font-light">
                            Supriya & Praveen's Wedding
                        </p>
                    </div>
                </motion.header>

                {/* Stats Cards */}
                <motion.div
                    className="p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-gold/20">
                            <div className="text-3xl font-bold text-maroon mb-2">
                                {rsvpData.length}
                            </div>
                            <div className="text-sm text-maroon/70 font-semibold">
                                Total Responses
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-gold/20">
                            <div className="text-3xl font-bold text-maroon mb-2">
                                {totalGuests}
                            </div>
                            <div className="text-sm text-maroon/70 font-semibold">
                                Total Guests
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* RSVP List */}
                <motion.div
                    className="flex-1 px-6 pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {rsvpData.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-gold/50 mb-4">
                                <FaUsers size={64} className="mx-auto" />
                            </div>
                            <p className="text-maroon font-semibold text-lg">
                                No RSVP responses yet
                            </p>
                            <p className="text-sm text-maroon/60 mt-2">
                                Check back later for guest responses
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {rsvpData.map((rsvp, index) => (
                                <motion.div
                                    key={rsvp.id}
                                    className="bg-white rounded-xl p-5 shadow-md border-2 border-gold/10 hover:border-gold/30 transition-all"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-serif font-bold text-maroon text-xl">
                                                {rsvp.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-maroon/70 mt-2">
                                                <FaUsers className="text-gold" />
                                                <span className="font-semibold">
                                                    {rsvp.numberofguests} guest
                                                    {rsvp.numberofguests > 1 ? "s" : ""}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-cream bg-maroon px-3 py-1 rounded-full font-semibold">
                                                #{index + 1}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-maroon/60">
                                        <FaCalendarAlt className="text-gold" />
                                        <span>{formatDate(rsvp.timestamp)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Footer */}
                <motion.footer
                    className="bg-maroon/5 p-4 text-center border-t-2 border-gold/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <p className="text-sm text-maroon/60">
                        Last updated: {new Date().toLocaleDateString("en-IN")}
                    </p>
                </motion.footer>
            </div>
        </div>
    );
}
