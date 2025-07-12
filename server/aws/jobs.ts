import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { client } from './client.js';
import { putObject, getObjectMetaData } from './actions.js';
import { getVersion } from '../riot/getVersion.js';
import { getSquareImg } from '../riot/getAssets.js';
import { championNames } from '../constants/championNames.js';

const storeAssetsInBucket = async () => {
    const version = await getVersion();
    championNames.forEach(async (champion) => {
        try {
            await client.send(
                getObjectMetaData({
                    Bucket: 'loldle',
                    Key: `${champion.name}/${champion.name}`,
                })
            );
        } catch {
            const img = await getSquareImg(champion.riot_id, version);
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

const storeAssetsInFs = async () => {
    const version = await getVersion();
    const PUBLIC_DIR = path.resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../../../client/public/'
    );

    championNames.forEach(async (champion) => {
        const img = Buffer.from(await getSquareImg(champion.riot_id, version));
        const dirName = path.join(PUBLIC_DIR, `${champion.id}.png`);
        fs.writeFile(dirName, img, () => {
            console.log(`File written to ${dirName}`);
        });
    });
};
storeAssetsInFs();
