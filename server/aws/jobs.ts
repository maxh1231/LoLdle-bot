import { client } from './client.ts';
import { putObject, getObjectMetaData } from './actions.ts';
import { getVersion } from '../riot/getVersion.ts';
import { getSquareImg } from '../riot/getAssets.ts';
import { championNames } from '../constants/championNames.ts';

const storeAssets = async () => {
    const version = await getVersion();
    const champs = ['Jax', 'Zed'];

    // champs.forEach(async (champion) => {
    //     const img = await getSquareImg(champion, version);
    //     client.send(
    //         putObject({
    //             Bucket: 'loldle',
    //             Key: `${champion}/${champion}`,
    //             Body: img,
    //         })
    //     );
    // });

    champs.forEach(async (champion) => {
        const response = await isInBucket(`${champion}/${champion}`);
        console.log(response);
    });
};

const isInBucket = async (objectKey: string) => {
    console.log(
        client.send(getObjectMetaData({ Bucket: 'loldle', Key: objectKey }))
    );
};

storeAssets();
