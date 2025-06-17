import client from './client.ts';
import { putObject } from './actions.ts';
import { getVersion } from '../riot/getVersion.ts';
import { getSquareImg } from '../riot/getAssets.ts';
import { championNames } from '../constants/championNames.ts';

const storeAssets = async () => {
    const version = await getVersion();
    const champs = ['Jax', 'Zed'];

    champs.forEach(async (champion) => {
        const img = await getSquareImg(champion, version);
        client.send(putObject(`${champion}/${champion}`, img));
    });
};

storeAssets();
