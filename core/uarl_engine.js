/**
 * UARL Adaptive Soul Engine
 * Handles hardware constraints and redistributes communication load.
 */

const CAPABILITY_WEIGHTS = {
    audio_vol: 0.20, audio_pitch: 0.15,
    loco_vel: 0.25, loco_steer: 0.10,
    artic_tilt: 0.20, artic_pan: 0.10
};

function calculateSoulBlock(word, robot) {
    // 1. Identify what the robot CAN actually do
    let available = [];
    if (robot.has_vol) available.push('audio_vol');
    if (robot.has_pitch) available.push('audio_pitch');
    if (robot.has_wheels) available.push('loco_vel');
    if (robot.has_tilt) available.push('artic_tilt');
    if (robot.has_pan) available.push('artic_pan');

    // 2. Calculate Redundancy (perceived intensity increases with more synced sensors)
    const n = available.length;
    const redundancy = 1 / Math.sqrt(n);
    const sStar = word.p * redundancy; // Target Sensation

    // 3. Redistribute Load
    let totalWeight = 0;
    available.forEach(a => totalWeight += CAPABILITY_WEIGHTS[a]);
    
    let effortMap = {};
    available.forEach(attr => {
        const weight = CAPABILITY_WEIGHTS[attr] * (1 / totalWeight);
        const effort = Math.pow(sStar * weight, 1 / 0.7); // Average Stevens Exponent

        effortMap[attr] = {
            effort: (effort * 100).toFixed(1) + "%",
            // The "Pasteable" Equation
            equation: `start + (${effort.toFixed(4)} - start) * ${getCurve(word.angle)}`,
            // Communication Mode
            mode: robot.has_cam ? "Social-Lock (Targeted)" : "Ambient-Pulse (Broadcast)"
        };
    });

    return effortMap;
}
