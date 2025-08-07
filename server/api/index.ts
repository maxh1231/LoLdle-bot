import { FastifyInstance } from 'fastify';
import { token } from './token.js';
import { champion } from './champion.js';
import { discord } from './discord.js';
import { handleDiscordInteraction } from '../plugins/discordInteractions.js';
export const api = async (server: FastifyInstance) => {
    server.get('/', async (_, reply) => {
        reply.send('ok');
    });

    server.register(token, { prefix: '/token' });
    server.register(champion, { prefix: '/champion' });
    server.register(discord, { prefix: '/discord' });
};
