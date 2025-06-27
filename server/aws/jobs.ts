import { client } from './client.js';
import { putObject, getObjectMetaData } from './actions.js';
import { getVersion } from '../riot/getVersion.js';
import { getSquareImg } from '../riot/getAssets.js';
import { championNames } from '../constants/championNames.js';

const storeAssets = async () => {
    const version = await getVersion();
    championNames.forEach(async (champion) => {
        try {
            // TODO: Util function that calls getObjectMetaData and handles returns error
            await client.send(
                getObjectMetaData({
                    Bucket: 'loldle',
                    Key: `${champion.name}/${champion.name}`,
                })
            );
        } catch {
            const img = await getSquareImg(champion.id, version);
            client.send(
                putObject({
                    Bucket: 'loldle',
                    Key: `${champion.name}/${champion.name}`,
                    Body: img,
                    ContentType: 'image/png',
                })
            );
        }
    });
};

storeAssets();
