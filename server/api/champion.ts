import { FastifyInstance } from 'fastify';

export const champion = async (server: FastifyInstance) => {
    server.get('/:name', async (request, reply) => {
        reply.send('test');
    });
};
