function getVerbForState(angle) {
    if (angle > 60 && angle < 120) return "SNAP";      
    if (angle >= 120 && angle < 200) return "SURGE";   
    if (angle >= 200 && angle < 300) return "YIELD";   
    return "LOG_RISE";                                 
}
