// TODO: This function is called per string per array for ClassicGuess arrays:
// position(s), species, and region(s). Refactor structure to allow each respective
// array to call this function once, appending a comma on each element except last.
/**
 * Appends comma to `str` if `i < arrLength`.
 * Used to commafy array of strings except last element.
 * @param str
 * @param i
 * @param arrLength
 * @returns {string} `str` with comma or original `str`.
 */
export const appendComma = (
    str: string,
    i: number,
    arrLength: number
): string => {
    if (i < arrLength - 1) return (str += ',');
    return str;
};
