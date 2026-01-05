/**
 * UARL Trajectories
 * Defines the mathematical 'Verbs' for smooth biological transitions.
 */
const TRAJECTORY_MODELS = {
    "SNAP": (t) => Math.pow(t, 2),        // Arousal spike
    "SURGE": (t) => Math.pow(t, 4),       // Aggressive looming
    "YIELD": (t) => Math.sqrt(t),        // Gentle deceleration
    "LOG_RISE": (t) => Math.log1p(t * 1.718), // Awakening curve
    "STOCHASTIC": (t) => t + (Math.random() - 0.5) * 0.1 // Internal struggle
};

function calculateVerb(startAngle, endAngle) {
    const diff = Math.abs(endAngle - startAngle);
    if (diff > 90) return "SNAP";
    if (endAngle < 180 && startAngle > 180) return "LOG_RISE";
    if (endAngle > 270) return "YIELD";
    return "SURGE";
}
