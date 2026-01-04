/**
 * UARL Dictionary & Psychophysical Constants
 */

export const NOUNS = {
    "ALIVE_READY": { x: 1.0, y: 0.0, theta: 0 },
    "THINKING": { x: -0.7, y: -0.7, theta: 225 },
    "ALARMED": { x: -0.5, y: 0.8, theta: 110 },
    "CALM": { x: 0.8, y: -0.5, theta: 315 }
};

export const VERBS = {
    "GLIDE": (t) => 3 * Math.pow(t, 2) - 2 * Math.pow(t, 3), // Cubic Ease
    "SNAP": (t) => Math.pow(t, 0.5), // Square root (Fast start)
    "FADE": (t) => 1 - Math.pow(1 - t, 2) // Ease out
};

// Psychophysical "Materials" (Waveforms)
export const MATERIALS = {
    S1_REST: (t) => 0.02, 
    S2_BREATHE: (t, freq = 0.5) => 0.05 * Math.sin(2 * Math.PI * freq * t),
    J2_SHADOW: () => (Math.random() * 2 - 1) * 0.05 // Stochastic jitter
};

// Human Antenna Trajectories (The path through the Circumplex)
export const ANTENNAS = {
    LOOMING: {
        name: "Optical Expansion",
        midpoint: { x: 0, y: 0.7 },
        stevens_exponent: 1.0, // Motion is generally linear
        weber_fraction: 0.10,
        // Trajectory: Spirals from center to Alarm
        getPoint: (intensity) => ({
            x: -Math.sin(intensity * Math.PI) * intensity,
            y: intensity
        })
    },
    VIBRATION: {
        name: "Tactile Mechanoreception",
        midpoint: { x: -0.8, y: 0.2 },
        stevens_exponent: 1.45, // Hyper-sensitive
        weber_fraction: 0.15,
        getPoint: (intensity) => ({
            x: -0.2 - (intensity * 0.6),
            y: -0.2 + (intensity * 0.4)
        })
    },
    BRIGHTNESS: {
        name: "Visual Luminance",
        midpoint: { x: 0.8, y: 0 },
        stevens_exponent: 0.33, // Numb to light
        weber_fraction: 0.08,
        getPoint: (intensity) => ({
            x: intensity,
            y: 0
        })
    }
};
