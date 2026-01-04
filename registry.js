/** * REGISTRY: The raw data for Nouns, Verbs, and Antennas
 */
export const Registry = {
    nouns: {
        "Alive/Ready": { x: 1.0, y: 0.0, theta: 0, material: "S2" },
        "Thinking": { x: -0.7, y: -0.7, theta: 225, material: "J2" },
        "Alarmed": { x: -0.5, y: 0.8, theta: 110, material: "J5" }
    },
    verbs: {
        "Glide": { formula: "3t² - 2t³", fn: (t) => 3*t**2 - 2*t**3 },
        "Snap": { formula: "√t", fn: (t) => Math.sqrt(t) }
    },
    antennas: {
        "Looming": { name: "Visual Expansion", alpha: 1.0, weber: 0.10, k: 90 },
        "Vibration": { name: "Mechanoreception", alpha: 1.45, weber: 0.15, k: 150 },
        "Brightness": { name: "Luminance", alpha: 0.33, weber: 0.08, k: 0 }
    }
};
