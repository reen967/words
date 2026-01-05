const COMPONENT_LOGIC = {
    audio_vol:    { exp: 0.6, wt: 0.20, curve_map: { SNAP: "t*t", SURGE: "t*t*t*t", YIELD: "Math.sqrt(t)", LOG_RISE: "Math.log1p(t*1.718)" } },
    audio_pitch:  { exp: 0.8, wt: 0.15, curve_map: { SNAP: "t*t", SURGE: "t*t*t*t", YIELD: "Math.sqrt(t)", LOG_RISE: "Math.log1p(t*1.718)" } },
    loco_vel:     { exp: 1.1, wt: 0.25, curve_map: { SNAP: "t*t", SURGE: "t*t*t*t", YIELD: "Math.sqrt(t)", LOG_RISE: "Math.log1p(t*1.718)" } },
    artic_tilt:   { exp: 1.0, wt: 0.20, curve_map: { SNAP: "t*t", SURGE: "t*t*t*t", YIELD: "Math.sqrt(t)", LOG_RISE: "Math.log1p(t*1.718)" } },
    artic_pan:    { exp: 1.0, wt: 0.10, curve_map: { SNAP: "t*t", SURGE: "t*t*t*t", YIELD: "Math.sqrt(t)", LOG_RISE: "Math.log1p(t*1.718)" } }
};

function calculateSoulBlock(word, robot) {
    let available = [];
    if (robot.has_vol) available.push('audio_vol');
    if (robot.has_pitch) available.push('audio_pitch');
    if (robot.has_wheels) available.push('loco_vel');
    if (robot.has_tilt) available.push('artic_tilt');
    if (robot.has_pan) available.push('artic_pan');

    const n = available.length;
    if (n === 0) return {};

    const redundancy = 1 / Math.sqrt(n);
    const sStar = word.p * redundancy;
    const verb = getVerbForState(word.angle);

    let totalWeight = 0;
    available.forEach(a => totalWeight += COMPONENT_LOGIC[a].wt);
    
    let effortMap = {};
    available.forEach(attr => {
        const spec = COMPONENT_LOGIC[attr];
        const weightMultiplier = 1 / totalWeight;
        const effort = Math.pow(sStar * (spec.wt * weightMultiplier), 1 / spec.exp);

        effortMap[attr] = {
            target_pct: (effort * 100).toFixed(1) + "%",
            equation: `start + (${effort.toFixed(4)} - start) * ${spec.curve_map[verb]}`,
            mode: robot.has_cam ? "Targeted" : "Broadcast"
        };
    });
    return effortMap;
}
