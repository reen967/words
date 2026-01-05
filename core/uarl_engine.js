/**
 * UARL Adaptive Engine
 * Calculates Intensity (I) based on Target Sensation (S*) and available Modalities (n)
 */

const COMPONENT_SPECS = {
    "locomotion": { exponent: 1.1, weight: 0.30, law: "Looming (dθ/dt)" },
    "tilt":       { exponent: 1.0, weight: 0.35, law: "Linear JND" },
    "audio":      { exponent: 0.6, weight: 0.20, law: "Logarithmic dB" },
    "light":      { exponent: 0.33, weight: 0.15, law: "Weber's Intensity" }
};

function calculateAdaptiveEffort(targetP, activeComponents) {
    // Redundancy Bonus: Sensation threshold lowers by sqrt(n)
    const n = activeComponents.length;
    const redundancyFactor = 1 / Math.sqrt(n);
    
    // Adjusted Target Sensation (S*)
    const sStar = targetP * redundancyFactor;

    // Total weight of available hardware
    let totalWeight = 0;
    activeComponents.forEach(c => totalWeight += COMPONENT_SPECS[c].weight);

    let redistribution = {};
    activeComponents.forEach(c => {
        const spec = COMPONENT_SPECS[c];
        const multiplier = 1 / totalWeight;
        
        // Solve for Intensity: I = (S* * multiplier)^(1/exponent)
        const compensatedS = sStar * (spec.weight * multiplier);
        const effort = Math.pow(compensatedS, 1 / spec.exponent);

        redistribution[c] = {
            effort_pct: (effort * 100).toFixed(1) + "%",
            contribution: (spec.weight * multiplier * 100).toFixed(0) + "%",
            stress_warning: (effort > 0.9)
        };
    });

    return { redistribution, redundancyFactor };
}
