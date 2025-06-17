/**
 * @param championName - champion to request.
 * @returns {Promise<Buffer<ArrayBuffer>>} square image of champion.
 */
const getSquareImg = async (
    championName: string,
    version: string
): Promise<Buffer<ArrayBuffer>> => {
    const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`
    );

    const data = await response.arrayBuffer();
    return Buffer.from(data);
};

export { getSquareImg };
