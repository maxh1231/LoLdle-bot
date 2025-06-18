/**
 * Obtains current League Of Legends version.
 * @returns {Promise<string>}
 */
export const getVersion = async (): Promise<string> => {
    const response = await fetch(
        'https://ddragon.leagueoflegends.com/api/versions.json'
    );
    const data = (await response.json()) as string[];
    return data[0];
};
