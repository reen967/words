/** * UARL Normalized Compiler
 * Maps emotions to % of Maximum Component Capability
 */

const LOGICAL_COMPONENTS = {
    "wheels": { exponent: 1.1, weber: 0.05, aspect: "Velocity" }, // Kinetic flow
    "tilt":   { exponent: 1.0, weber: 0.03, aspect: "Angular Position" }, // Gaze/Posture
    "volume": { exponent: 0.6, weber: 0.10, aspect: "Amplitude" }, // Acoustic
    "light":  { exponent: 0.33, weber: 0.02, aspect: "Luminosity" } // visual
};

function compileNormalizedEmotion(emotion, components) {
    let mapping = {
        word: emotion.name,
        vector: { theta: emotion.angle, p: emotion.p },
        effort_profile: {}
    };

    components.forEach(compKey => {
        const spec = LOGICAL_COMPONENTS[compKey];
        
        // Reverse Stevens' Law to find Required Effort (%)
        // Effort = (Precision ^ (1/exponent)) * 100
        let effortPercent = Math.pow(emotion.p, 1 / spec.exponent) * 100;
        
        mapping.effort_profile[compKey] = {
            max_effort_pct: effortPercent.toFixed(1) + "%",
            verb_style: getVerbLogic(emotion.angle),
            jitter_threshold: ((1 - emotion.p) * 5).toFixed(1) + "%", // Random drift in effort
            attack_speed: emotion.angle < 180 ? "Fast" : "Slow" 
        };
    });

    return mapping;
}

function getVerbLogic(angle) {
    if (angle > 45 && angle < 135) return "SNAP (t²)";
    if (angle >= 135 && angle < 225) return "STOCHASTIC (Jitter)";
    if (angle >= 225 && angle < 315) return "YIELD (√t)";
    return "SURGE (t⁴)";
}
