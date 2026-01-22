export default function DecorativeBorder({ className = "" }: { className?: string }) {
    return (
        <div className={`w-full h-8 ${className}`}>
            <svg
                viewBox="0 0 100 20"
                className="w-full h-full text-maroon/20 fill-current"
                preserveAspectRatio="none"
            >
                <path d="M0 20 L5 10 L10 20 L15 10 L20 20 L25 10 L30 20 L35 10 L40 20 L45 10 L50 20 L55 10 L60 20 L65 10 L70 20 L75 10 L80 20 L85 10 L90 20 L95 10 L100 20 V0 H0 Z" />
            </svg>
        </div>
    );
}
