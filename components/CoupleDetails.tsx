"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import DecorativeBorder from "./DecorativeBorder";
import { useEffect, useState } from "react";

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

// Component for letter-by-letter animation
interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    shouldAnimate: boolean;
}

function AnimatedText({ text, className = "", delay = 0, shouldAnimate }: AnimatedTextProps) {
    const letters = text.split("");

    if (!shouldAnimate) {
        return <span className={className}>{text}</span>;
    }

    return (
        <span className={className}>
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: delay + index * 0.03, // 30ms delay between letters
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                    style={{ display: "inline-block" }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </span>
    );
}

export default function CoupleDetails({ bride, groom }: CoupleDetailsProps) {
    const shouldReduceMotion = useReducedMotion();

    // Animation variants for mobile text
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    };

    // Disable animations if user prefers reduced motion
    const shouldAnimate = !shouldReduceMotion;

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
                <div className="flex flex-col items-center gap-0">
                    {/* Animated Header */}
                    <div className="w-48 h-48 relative mb-10">
                        <Image
                            src="/images/couple_animation_heart.svg"
                            alt="Couple Animation"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>

                    {/* Bride Section */}
                    <div className="text-center pb-2">
                        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-1 block">
                            <AnimatedText
                                text="The Bride"
                                shouldAnimate={shouldAnimate}
                                delay={0}
                            />
                        </span>
                        <h2 className="text-3xl md:text-4xl text-maroon font-serif font-bold mb-1">
                            <AnimatedText
                                text={bride.name}
                                shouldAnimate={shouldAnimate}
                                delay={0.1}
                            />
                            {bride.degree && (
                                <span className="text-lg md:text-xl font-sans font-medium opacity-70 ml-2">
                                    <AnimatedText
                                        text={bride.degree}
                                        shouldAnimate={shouldAnimate}
                                        delay={0.1 + bride.name.length * 0.03}
                                    />
                                </span>
                            )}
                        </h2>
                        {bride.parents && (
                            <p className="text-maroon/70 text-sm md:text-base italic font-serif mb-1">
                                <AnimatedText
                                    text={bride.parents}
                                    shouldAnimate={shouldAnimate}
                                    delay={0.3}
                                />
                            </p>
                        )}

                        {(bride.jobTitle || bride.company) && (
                            <div className="text-maroon/80 font-sans">
                                {bride.jobTitle && (
                                    <p className="font-medium">
                                        <AnimatedText
                                            text={bride.jobTitle}
                                            shouldAnimate={shouldAnimate}
                                            delay={0.4}
                                        />
                                    </p>
                                )}
                                {bride.company && (
                                    <p className="opacity-80">
                                        <AnimatedText
                                            text={bride.company}
                                            shouldAnimate={shouldAnimate}
                                            delay={0.4 + (bride.jobTitle?.length || 0) * 0.03 + 0.1}
                                        />
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <motion.div
                        variants={shouldAnimate ? textVariants : undefined}
                        initial={shouldAnimate ? "hidden" : false}
                        whileInView={shouldAnimate ? "visible" : undefined}
                        viewport={{ once: true }}
                        custom={5}
                        className="flex items-center justify-center h-8"
                    >
                        <span className="text-gold font-serif text-3xl font-light italic">&</span>
                    </motion.div>

                    {/* Groom Section */}
                    <div className="text-center pt-2">
                        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-1 block">
                            <AnimatedText
                                text="The Groom"
                                shouldAnimate={shouldAnimate}
                                delay={0.5}
                            />
                        </span>
                        <h2 className="text-3xl md:text-4xl text-maroon font-serif font-bold mb-1">
                            <AnimatedText
                                text={groom.name}
                                shouldAnimate={shouldAnimate}
                                delay={0.6}
                            />
                            {groom.degree && (
                                <span className="text-lg md:text-xl font-sans font-medium opacity-70 ml-2">
                                    <AnimatedText
                                        text={groom.degree}
                                        shouldAnimate={shouldAnimate}
                                        delay={0.6 + groom.name.length * 0.03}
                                    />
                                </span>
                            )}
                        </h2>
                        {groom.parents && (
                            <p className="text-maroon/70 text-sm md:text-base italic font-serif mb-1">
                                <AnimatedText
                                    text={groom.parents}
                                    shouldAnimate={shouldAnimate}
                                    delay={0.8}
                                />
                            </p>
                        )}

                        {(groom.jobTitle || groom.company) && (
                            <div className="text-maroon/80 font-sans">
                                {groom.jobTitle && (
                                    <p className="font-medium">
                                        <AnimatedText
                                            text={groom.jobTitle}
                                            shouldAnimate={shouldAnimate}
                                            delay={0.9}
                                        />
                                    </p>
                                )}
                                {groom.company && (
                                    <p className="opacity-80">
                                        <AnimatedText
                                            text={groom.company}
                                            shouldAnimate={shouldAnimate}
                                            delay={0.9 + (groom.jobTitle?.length || 0) * 0.03 + 0.1}
                                        />
                                    </p>
                                )}
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
