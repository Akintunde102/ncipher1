exports.changeMinToCronTime = (minutes) => {
    if (minutes <= 0 || minutes > 59) {
        throw new Error("Minutes must be between 1 and 59");
    }
    return `*/${minutes} * * * *`;
}


