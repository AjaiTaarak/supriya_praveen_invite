"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface EventDetailsProps {
    title: string;
    date: string;
    time: string;
    venueName: string;
    venueAddress: string;
    mapLink: string;
    showDecorations?: boolean;
}

// Hook to detect mobile screen
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };
        
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
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
    const isMobile = useIsMobile();
    const shouldReduceMotion = useReducedMotion();
    const isMuhurtham = title === "Muhurtham";

    // Disable animations on desktop or if user prefers reduced motion
    const shouldAnimate = isMobile && !shouldReduceMotion && isMuhurtham;

    // Card animation variants for mobile Muhurtham
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Text animation variants for mobile Muhurtham
    const textVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1 + 0.2, // Start after card animation
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

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
                variants={shouldAnimate ? cardVariants : undefined}
                initial={shouldAnimate ? "hidden" : { opacity: 0, y: 30 }}
                whileInView={shouldAnimate ? "visible" : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldAnimate ? undefined : { duration: 0.8 }}
                className={`relative z-10 text-center border p-8 rounded-lg shadow-sm ${
                    isMuhurtham 
                        ? "bg-[#2f3e2e] border-cream/20" 
                        : "border-maroon/20 bg-white/50 backdrop-blur-sm"
                }`}
            >
                <motion.h3
                    variants={shouldAnimate ? textVariants : undefined}
                    initial={shouldAnimate ? "hidden" : false}
                    whileInView={shouldAnimate ? "visible" : undefined}
                    viewport={{ once: true }}
                    custom={0}
                    className={`text-3xl font-serif font-bold mb-6 ${
                        isMuhurtham ? "text-gold" : "text-maroon"
                    }`}
                >
                    {title}
                </motion.h3>

                <div className={`space-y-4 mb-8 ${isMuhurtham ? "text-cream" : "text-maroon/90"}`}>
                    <motion.div
                        variants={shouldAnimate ? textVariants : undefined}
                        initial={shouldAnimate ? "hidden" : false}
                        whileInView={shouldAnimate ? "visible" : undefined}
                        viewport={{ once: true }}
                        custom={1}
                        className="flex flex-col items-center"
                    >
                        <span className="font-semibold text-gold uppercase text-xs tracking-wider mb-1">When</span>
                        <motion.p
                            variants={shouldAnimate ? textVariants : undefined}
                            initial={shouldAnimate ? "hidden" : false}
                            whileInView={shouldAnimate ? "visible" : undefined}
                            viewport={{ once: true }}
                            custom={2}
                            className="text-lg"
                        >
                            {date}
                        </motion.p>
                        <motion.p
                            variants={shouldAnimate ? textVariants : undefined}
                            initial={shouldAnimate ? "hidden" : false}
                            whileInView={shouldAnimate ? "visible" : undefined}
                            viewport={{ once: true }}
                            custom={3}
                            className="text-base"
                        >
                            {time}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={shouldAnimate ? textVariants : undefined}
                        initial={shouldAnimate ? "hidden" : false}
                        whileInView={shouldAnimate ? "visible" : undefined}
                        viewport={{ once: true }}
                        custom={4}
                        className={`w-16 h-px mx-auto my-4 ${
                            isMuhurtham ? "bg-cream/30" : "bg-maroon/20"
                        }`}
                    />

                    <motion.div
                        variants={shouldAnimate ? textVariants : undefined}
                        initial={shouldAnimate ? "hidden" : false}
                        whileInView={shouldAnimate ? "visible" : undefined}
                        viewport={{ once: true }}
                        custom={5}
                        className="flex flex-col items-center"
                    >
                        <span className="font-semibold text-gold uppercase text-xs tracking-wider mb-1">Where</span>
                        <motion.p
                            variants={shouldAnimate ? textVariants : undefined}
                            initial={shouldAnimate ? "hidden" : false}
                            whileInView={shouldAnimate ? "visible" : undefined}
                            viewport={{ once: true }}
                            custom={6}
                            className="text-lg font-medium"
                        >
                            {venueName}
                        </motion.p>
                        {venueAddress && (
                            <motion.p
                                variants={shouldAnimate ? textVariants : undefined}
                                initial={shouldAnimate ? "hidden" : false}
                                whileInView={shouldAnimate ? "visible" : undefined}
                                viewport={{ once: true }}
                                custom={7}
                                className={`text-sm max-w-[250px] mx-auto ${
                                    isMuhurtham ? "opacity-80" : "opacity-80"
                                }`}
                            >
                                {venueAddress}
                            </motion.p>
                        )}
                    </motion.div>
                </div>

                <motion.a
                    variants={shouldAnimate ? textVariants : undefined}
                    initial={shouldAnimate ? "hidden" : false}
                    whileInView={shouldAnimate ? "visible" : undefined}
                    viewport={{ once: true }}
                    custom={8}
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm shadow-md transition-colors ${
                        isMuhurtham
                            ? "bg-gold text-[#2f3e2e] hover:bg-gold/90"
                            : "bg-maroon text-cream hover:bg-maroon/90"
                    }`}
                >
                    <MapPin size={16} />
                    Navigate to Venue
                    <ArrowUpRight size={16} />
                </motion.a>
            </motion.div>
        </section>
    );
}
