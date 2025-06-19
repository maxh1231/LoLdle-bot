import { client } from './client.ts';
import { putObject, getObjectMetaData } from './actions.ts';
import { getVersion } from '../riot/getVersion.ts';
import { getSquareImg } from '../riot/getAssets.ts';
import { championNames } from '../constants/championNames.ts';

const storeAssets = async () => {
    const version = await getVersion();
    championNames.forEach(async (champion) => {
        try {
            // TODO: Util function that calls getObjectMetaData and handles returns error
            await client.send(
                getObjectMetaData({
                    Bucket: 'loldle',
                    Key: `${champion}/${champion}`,
                })
            );
        } catch {
            const img = await getSquareImg(champion, version);
            client.send(
                putObject({
                    Bucket: 'loldle',
                    Key: `${champion}/${champion}`,
                    Body: img,
                    ContentType: 'image/png',
                })
            );
        }
    });
};

storeAssets();
