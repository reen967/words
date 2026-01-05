function getVerbForState(angle) {
    // 0-360 mapped to psychophysical curves
    if (angle > 60 && angle < 120) return "SNAP";      // High arousal/Surprise
    if (angle >= 120 && angle < 200) return "SURGE";   // Aggression/Looming
    if (angle >= 200 && angle < 300) return "YIELD";   // Submission/Sadness
    return "LOG_RISE";                                 // Biological Pulse/Calm
}
