function sum(a, b) {
    const hasInvalidArgument = [...arguments].some(argument => typeof argument !== 'number');

    if (hasInvalidArgument) {
        throw new TypeError();
    }

    return a + b;
}

module.exports = sum;
