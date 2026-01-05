/** * UARL Compiler
 * Converts Russell's Circumplex points into Capability-Agnostic Intensity 
 */
const MODALITIES = {
    "rotation": { exponent: 1.0, weber: 0.05, label: "Kinetic" },
    "sound": { exponent: 0.6, weber: 0.10, label: "Acoustic" },
    "light": { exponent: 0.33, weber: 0.02, label: "Luminous" }
};

function compileEmotion(emotion, hardwareList) {
    let mapping = {
        name: emotion.name,
        vector: { theta: emotion.angle, magnitude: emotion.p },
        outputs: {}
    };

    hardwareList.forEach(mod => {
        const spec = MODALITIES[mod];
        // Reverse Stevens' Power Law: Intensity I = S^(1/a)
        const rawIntensity = Math.pow(emotion.p, 1 / spec.exponent);
        
        mapping.outputs[mod] = {
            intensity: rawIntensity.toFixed(4),
            jnd_step: (rawIntensity * spec.weber).toFixed(4),
            jitter: (1 - emotion.p) * 0.05
        };
    });

    return mapping;
}
