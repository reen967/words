/**
 * UARL Trajectory Matrix
 * Mathematical curves for organic machine motion.
 */
const VERB_TRAJECTORIES = {
    "SNAP": { curve: (t) => Math.pow(t, 2), description: "High-Arousal Attack" },
    "SURGE": { curve: (t) => Math.pow(t, 4), description: "Looming/Aggression" },
    "YIELD": { curve: (t) => Math.sqrt(t), description: "Deceleration/Safety" },
    "LOG_RISE": { curve: (t) => Math.log1p(t * 1.718), description: "Biological Pulse" },
    "STOCHASTIC": { curve: (t) => t + (Math.random() - 0.5) * 0.1, description: "Internal Struggle" }
};

function getVerbForState(angle) {
    // 0-360 mapped to psychophysical curves
    if (angle > 60 && angle < 120) return "SNAP";      // High arousal/Surprise
    if (angle >= 120 && angle < 200) return "SURGE";   // Aggression/Looming
    if (angle >= 200 && angle < 300) return "YIELD";   // Submission/Sadness
    return "LOG_RISE";                                 // Biological Pulse/Calm
}



