import { FastifyInstance } from 'fastify';
import { token } from './token.js';
import { champion } from './champion.js';
export const api = async (server: FastifyInstance) => {
    server.get('/', async (request, reply) => {
        reply.send('ok');
    });

    server.register(token, { prefix: '/token' });
    server.register(champion, { prefix: '/champion' });
};
