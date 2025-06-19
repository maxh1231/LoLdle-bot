import { FastifyInstance } from 'fastify';
export const api = async (server: FastifyInstance) => {
    server.get('/', async (request, reply) => {
        reply.send('ok');
    });
};
