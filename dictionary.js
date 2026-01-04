const Dictionary = {
    nouns: {
        // Russell Affective States
        "alarmed": { theta: 96.5, x: -0.11, y: 0.99, material: "J4" },
        "angry": { theta: 119.5, x: -0.49, y: 0.87, material: "J5" },
        "miserable": { theta: 188.7, x: -0.99, y: -0.15, material: "J3" },
        "bored": { theta: 237.9, x: -0.53, y: -0.85, material: "J1" },
        "sleepy": { theta: 271.9, x: 0.03, y: -1.0, material: "S1" },
        "calm": { theta: 294.1, x: 0.41, y: -0.91, material: "S1" },
        "relaxed": { theta: 310.2, x: 0.65, y: -0.76, material: "S2" },
        "happy": { theta: 7.8, x: 0.99, y: 0.14, material: "S3" },
        "excited": { theta: 48.5, x: 0.66, y: 0.75, material: "S4" },
        "astonished": { theta: 69.8, x: 0.35, y: 0.94, material: "S5" },
        
        // Robot Operational States
        "thinking": { theta: 225.0, x: -0.7, y: -0.7, material: "J2" },
        "busy": { theta: 90.0, x: 0.0, y: 1.0, material: "J4" },
        "success": { theta: 45.0, x: 0.7, y: 0.7, material: "S4" },
        "danger": { theta: 100.0, x: -0.2, y: 1.0, material: "J5" }
    },
    verbs: {
        "snap": (t) => 1 - Math.pow(1 - t, 4),
        "glide": (t) => 3 * Math.pow(t, 2) - 2 * Math.pow(t, 3),
        "surge": (t) => Math.pow(t, 4),
        "yield": (t) => Math.sqrt(t),
        "fade": (t) => 1 - Math.pow(1 - t, 2),
        "step": (t) => (t > 0.5 ? 1 : 0)
    },
    materials: {
        // Sines (Positive Valence)
        "S1": (t) => 0.02 * Math.sin(5 * t),
        "S2": (t) => 0.05 * Math.sin(10 * t),
        "S3": (t) => 0.10 * Math.sin(15 * t),
        "S4": (t) => 0.20 * Math.sin(25 * t),
        "S5": (t) => 0.25 * Math.sin(35 * t),
        // Jitters (Negative Valence)
        "J1": () => 0,
        "J2": () => 0.05 * (Math.random() * 2 - 1),
        "J3": () => 0.10 * (Math.random() * 2 - 1),
        "J4": () => 0.15 * (Math.random() * 2 - 1),
        "J5": () => 0.25 * (Math.random() * 2 - 1)
    }
};
