import { NOUNS, VERBS, MATERIALS, ANTENNAS } from './definitions.js';

export class SensoryKernel {
    constructor(robot) {
        this.robot = robot;
    }

    // Step-by-Step Transition Calculation
    calculateState(sentence, t) {
        const { startNoun, verb, endNoun } = sentence;
        const u = VERBS[verb](t);

        // 1. Calculate the "Pure" Emotional Path
        const targetX = NOUNS[startNoun].x + (NOUNS[endNoun].x - NOUNS[startNoun].x) * u;
        const targetY = NOUNS[startNoun].y + (NOUNS[endNoun].y - NOUNS[startNoun].y) * u;

        // 2. Initial Startle Trigger (The Orienting Response)
        let startle = 0;
        if (t < 0.2) {
            startle = Math.exp(-t * 10) * 0.3; // Decay function
        }

        // 3. Process each Robot Capability
        return this.robot.capabilities.map(cap => {
            const antenna = ANTENNAS[cap.antennaType];
            
            // Raw Intensity required to reach target
            let rawI = Math.sqrt(targetX**2 + targetY**2) + startle;
            rawI = Math.min(Math.max(rawI, 0), 1);

            // STEVENS' POWER LAW CORRECTION
            // Output = Floor + (I ^ 1/alpha) * (Ceiling - Floor)
            const correctedI = Math.pow(rawI, 1 / antenna.stevens_exponent);
            
            // HARDWARE NORMALIZATION
            const hardwareOutput = cap.minEffort + correctedI * (cap.maxEffort - cap.minEffort);

            // Apply Material (S-series or J-series)
            const vibe = (targetX < 0) ? MATERIALS.J2_SHADOW() : MATERIALS.S2_BREATHE(t);

            return {
                capability: cap.name,
                signal: hardwareOutput + vibe,
                antennaTarget: antenna.name,
                intensityPerc: (correctedI * 100).toFixed(1)
            };
        });
    }
}
