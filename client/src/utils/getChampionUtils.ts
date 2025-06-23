/**
 * Gets the image of a champion.
 * @param championName
 * @returns {Promise<string>} - Object URL of champion image.
 */
export const getChampionSquare = async (
    championName: string
): Promise<string> => {
    const response = await fetch(`/api/champion/${championName}`);
    const data = await response.blob();
    return URL.createObjectURL(data);
};
