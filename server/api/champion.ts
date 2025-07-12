import { getObject } from '../aws/actions.js';
import { client } from '../aws/client.js';
import { FastifyInstance } from 'fastify';
import { getClassicDailyChampion } from '../db/queries.js';

export const champion = async (server: FastifyInstance) => {
    server.get('/:name', async (request, reply) => {
        const { name } = request.params as { name: string };
        try {
            const data = await client.send(
                getObject({
                    Key: `${name}/${name}`,
                })
            );
            reply.header(
                'Content-Type',
                data.ContentType || 'application/octet-stream'
            );

            const byteArr = await data.Body?.transformToByteArray();
            if (byteArr) reply.send(Buffer.from(byteArr));
        } catch (err) {
            if (!reply.sent)
                reply
                    .status(500)
                    .send({ error: 'S3 fetch failed', details: String(err) });
        }
    });

    server.get('/classic', async (_, reply) => {
        const id = await getClassicDailyChampion(server);
        reply.send({ id: id });
    });
};
