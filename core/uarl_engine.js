/**
 * UARL Adaptive Engine v4 (Constraint-Aware)
 */
const COMPONENT_LOGIC = {
    audio: { 
        vol: { exp: 0.6, wt: 0.15 }, 
        pitch: { exp: 0.8, wt: 0.10 } 
    },
    locomotion: { 
        velocity: { exp: 1.1, wt: 0.25 }, 
        rotation: { exp: 1.0, wt: 0.15 } 
    },
    articulation: { 
        tilt: { exp: 1.0, wt: 0.20 }, 
        pan: { exp: 1.0, wt: 0.15 } 
    }
};

function calculateCompensatedBlock(word, robot) {
    // 1. Filter only what the robot CAN do
    let activeWeights = 0;
    let available = [];

    if (robot.has_vol) available.push('audio_vol');
    if (robot.has_pitch) available.push('audio_pitch');
    if (robot.has_tilt) available.push('artic_tilt');
    if (robot.has_wheels) available.push('loco_vel');

    // 2. Redistribute S* (Target Sensation)
    const n = available.length;
    const redundancy = 1 / Math.sqrt(n);
    const sStar = word.p * redundancy;

    let effortMap = {};
    available.forEach(attr => {
        // Find the weight and exponent for this specific sub-capability
        const [cat, sub] = attr.split('_');
        const spec = COMPONENT_LOGIC[cat === 'audio' ? 'audio' : cat === 'loco' ? 'locomotion' : 'articulation'][sub];
        
        // Multiplier based on missing parts
        const effort = Math.pow(sStar * (1/n), 1 / spec.exp);

        effortMap[attr] = {
            target: effort.toFixed(4),
            equation: `start + (${effort.toFixed(4)} - start) * ${getCurve(word.angle)}`,
            intent: robot.has_vision ? "Target-Locked" : "Broadcast-Mode"
        };
    });

    return effortMap;
}
