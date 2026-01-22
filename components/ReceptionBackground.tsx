export default function ReceptionBackground() {
    return (
        <div className="cosmic-element">
            <span className="stars-layer" />
            <span className="wind-wave" />
            <span className="ice-crystal" />
            <svg className="filter-effects" style={{ display: 'none' }}>
                <filter id="cosmic-texture">
                    <feTurbulence
                        result="turb"
                        numOctaves="3"
                        baseFrequency="0.03"
                        type="fractalNoise"
                    />
                    <feColorMatrix
                        result="colored"
                        values="1 0 0 0 0.5 
            0 0.8 0 0 0 
            0 0 0.2 0 0 
            0 0 0 0.4 0"
                        type="matrix"
                        in="turb" />
                    <feBlend mode="screen" in2="colored" in="SourceGraphic" />
                </filter>
            </svg>
        </div>
    );
}
