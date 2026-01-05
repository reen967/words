/**
 * UARL Affective Compiler
 * Logic: Distributes "Emotional Load" across available hardware modalities.
 */

const VERB_LOGIC = {
    "Snap": (t) => Math.pow(t, 2),        // Parabolic Acceleration
    "Surge": (t) => Math.pow(t, 4),       // Aggressive Looming
    "Decel": (t) => Math.sqrt(t),        // Gentle yielding
    "LogRise": (t) => Math.log1p(t),     // Biological awakening
    "Stochastic": (t) => Math.random(),   // Internal struggle/Jitter
    "Swell": (t) => Math.sin(t * Math.PI) // Rhythmic pulse
};

const MODALITIES = {
    "rotation": { exponent: 1.0, weber: 0.05, label: "Kinetic Velocity" },
    "sound": { exponent: 0.6, weber: 0.10, label: "Acoustic Volume" },
    "light": { exponent: 0.33, weber: 0.02, label: "Luminous Intensity" }
};

function generateRobotDictionary(robotProfile) {
    // robotProfile = { name: "Roomba", hardware: ["sound", "rotation"] }
    
    return AFFECTIVE_DATA.map(emotion => {
        let compiledEntry = {
            word: emotion.name,
            angle: emotion.angle,
            precision: emotion.p,
            hardware_mix: {}
        };

        robotProfile.hardware.forEach(mod => {
            const spec = MODALITIES[mod];
            // Calculate stimulus intensity based on Stevens' Power Law
            // Perceived Magnitude S = I^a -> We solve for I
            const targetIntensity = Math.pow(emotion.p, 1 / spec.exponent);
            
            compiledEntry.hardware_mix[mod] = {
                baseline_intensity: targetIntensity.toFixed(3),
                verb_type: getVerbForAngle(emotion.angle),
                jnd_threshold: (targetIntensity * spec.weber).toFixed(4),
                jitter_epsilon: (1 - emotion.p) * 0.05 // Fuzziness determines jitter
            };
        });

        return compiledEntry;
    });
}

function getVerbForAngle(angle) {
    if (angle > 45 && angle < 135) return "Snap";      // High Arousal
    if (angle >= 135 && angle < 225) return "Stochastic"; // Distress/Misery
    if (angle >= 225 && angle < 315) return "Decel";    // Low Energy
    return "LogRise"; // Pleasure/Calm
}
