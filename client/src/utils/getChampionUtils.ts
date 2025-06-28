/**
 * Removes whitespace and puncation from a champion name
 * @param championName
 * @returns {string} - URL of champion image.
 */
export const buildImgUrl = (championName: string): string => {
    const raw = championName.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return `/champion/${raw}/${raw}`;
};
