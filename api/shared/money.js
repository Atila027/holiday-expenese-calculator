/**
 * Parses a floating point number into a suitable money amount
 * @param {number} amount
 * @returns {number}
 */
function parseAmount(amount) {
    return parseFloat(amount.toFixed(2));
}

/**
 * Multiplies floats into integers and divides - to handle floating point issues
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sumAmount(a, b) {
    return parseAmount((a * 100 + b * 100) / 100);
}

module.exports = {
    parseAmount,
    sumAmount
}