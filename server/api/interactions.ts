import { FastifyInstance } from 'fastify';
import { InteractionResponseType } from 'discord-interactions';
import { discordVerificationHandler } from '../utils/discord.js';
import { APIBaseInteraction, InteractionType } from 'discord-api-types/v10';

export const interactions = async (server: FastifyInstance) => {
    const discordVerification = discordVerificationHandler(
        process.env.DISCORD_PUBLIC_KEY!
    );

    server.addContentTypeParser(
        'application/json',
        { parseAs: 'string' },
        (_, body, done) => {
            try {
                const rawBody =
                    typeof body === 'string' ? body : body.toString();
                done(null, JSON.parse(rawBody));
            } catch (err: any) {
                done(err, undefined);
            }
        }
    );

    server.post<{
        Body: APIBaseInteraction<InteractionType.Ping, undefined>;
    }>(
        '/',
        {
            preHandler: discordVerification,
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        application_id: { type: 'string' },
                        type: { type: 'number' },
                        data: { type: 'null' },
                    },
                    required: ['id', 'application_id'],
                    additionalProperties: false,
                },
            },
        },
        async (request, reply) => {
            const { id, application_id, type } = request.body;

            server.log.info('Discord interaction received', {
                id,
                type,
                application_id,
            });

            if (type === InteractionType.Ping) {
                server.log.info('Responding to Discord PING');
                return reply
                    .code(200)
                    .send({ type: InteractionResponseType.PONG });
            }

            // APPLICATION_COMMAND

            if (type === InteractionType.ApplicationCommand) {
                return reply.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: 'Interaction Response',
                    },
                });
            }
        }
    );
};
