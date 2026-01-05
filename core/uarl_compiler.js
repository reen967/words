/** * UARL Block Compiler
 * Generates cut-and-pastable "Word Blocks"
 */

const OPERATIONAL_WORDS = {
    "I_SEE_YOU": { angle: 90, p: 0.95, verb: "SNAP", note: "Targeting Lock" },
    "I_AM_ALIVE": { angle: 330, p: 0.40, verb: "LOG_RISE", note: "Vitality Pulse" },
    "APPROACHING": { angle: 120, p: 0.85, verb: "SURGE", note: "Looming Vector" },
    "YIELDING": { angle: 240, p: 0.50, verb: "DECEL", note: "Space Withdrawal" }
};

function generateWordBlock(wordKey, robotComponents) {
    const data = OPERATIONAL_WORDS[wordKey] || AFFECTIVE_DATA.find(e => e.name === wordKey);
    let block = {
        word: wordKey,
        instructions: []
    };

    robotComponents.forEach(comp => {
        const spec = LOGICAL_COMPONENTS[comp];
        const effort = Math.pow(data.p, 1 / spec.exponent) * 100;

        block.instructions.push({
            component: comp,
            target_effort: effort.toFixed(1) + "%",
            trajectory: data.verb || getVerbLogic(data.angle),
            // For wheels, we define the vector relative to the human
            vector_logic: comp === "wheels" ? "Orient to 0° (Human) + Velocity" : "Intensity Only"
        });
    });
    return block;
}
