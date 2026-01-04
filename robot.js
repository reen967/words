export class RobotCapability {
    constructor(name, antennaType, minEffort, maxEffort) {
        this.name = name;
        this.antennaType = antennaType; // e.g., 'BRIGHTNESS'
        this.minEffort = minEffort; // Weber Absolute Threshold (e.g., 0.1)
        this.maxEffort = maxEffort; // Hardware Limit (e.g., 0.9)
    }
}

export class Robot {
    constructor(name) {
        this.name = name;
        this.capabilities = [];
    }

    addCapability(cap) {
        this.capabilities.push(cap);
    }

    getSummary() {
        return `Robot ${this.name} has ${this.capabilities.length} active human antennas.`;
    }
}
