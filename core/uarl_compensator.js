/**
 * UARL Adaptive Perceptual Compensator
 * Logic: Redistributes 'Perceptual Load' (S*) across available hardware.
 */

const MODALITY_WEIGHTS = {
    "tilt": 0.35,     // Social/Animacy weight
    "wheels": 0.30,   // Spatial/Threat weight
    "sound": 0.20,    // Informational/Alert weight
    "light": 0.15     // Status/Atmospheric weight
};

function calculateCompensatedEffort(targetSensation, availableHardware) {
    // 1. Calculate the Total Available Weight
    let totalAvailableWeight = 0;
    availableHardware.forEach(h => {
        totalAvailableWeight += MODALITY_WEIGHTS[h] || 0.1;
    });

    // 2. Calculate the "Compensation Multiplier" 
    // If hardware is missing, remaining hardware must work harder.
    const multiplier = 1 / totalAvailableWeight;

    let redistribution = {};
    availableHardware.forEach(h => {
        const spec = LOGICAL_COMPONENTS[h];
        // S = k * I^a. We solve for I (Effort)
        // We multiply the target sensation by the compensation multiplier
        const compensatedS = targetSensation * multiplier;
        const rawEffort = Math.pow(compensatedS, 1 / spec.exponent);
        
        redistribution[h] = {
            normalized_effort: (rawEffort * 100).toFixed(1) + "%",
            perceptual_contribution: (MODALITY_WEIGHTS[h] * multiplier * 100).toFixed(0) + "%",
            is_overloaded: multiplier > 2.0 // Warning if hardware is carrying too much load
        };
    });

    return redistribution;
}
