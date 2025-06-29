/**
 * Removes whitespace and puncation from a champion name
 * @param championName
 * @returns {string} - URL of champion image.
 */
export const buildImgUrl = (championName: string): string => {
    console.log(import.meta.env.VITE_R2_BUCKET);
    const raw = championName.replace(/[^a-zA-Z]/g, '').toLowerCase();
    // if rendered in discord activity request is proxied, otherwise standard URL
    // TODO: Clean this functionality up with alternative method
    return window.self !== window.top
        ? `/champion/${raw}/${raw}`
        : `${import.meta.env.VITE_R2_BUCKET}/${raw}/${raw}`;
};
