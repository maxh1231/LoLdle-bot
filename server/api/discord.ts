import { FastifyInstance } from 'fastify';
import { handleDiscordInteraction } from '../plugins/discordInteractions.js';
import { InteractionResponseType } from 'discord-interactions';
import {
    APIBaseInteraction,
    Snowflake,
    APIBaseGuildMember,
    APIPingInteraction,
    InteractionType,
} from 'discord-api-types/v10';

export const discord = async (server: FastifyInstance) => {
    server.register(async (server) => {
        server.register(handleDiscordInteraction, {
            publicKey: process.env.DISCORD_PUBLIC_KEY!,
        });

        server.post<{
            Body: APIBaseInteraction<InteractionType.Ping, undefined>;
        }>(
            '/interaction',
            {
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
                    return { type: InteractionResponseType.PONG };
                }

                // APPLICATION_COMMAND

                if (type === InteractionType.ApplicationCommand) {
                    return {
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: 'Interaction Response',
                        },
                    };
                }
            }
        );
    });

    server.get('/message', async (request, reply) => {
        const { channelId, playerName, avatarHash } = request.params as {
            channelId: string;
            playerName: string;
            avatarHash: string;
        };
        const response = await fetch(
            `https://discord.com/api/v10/channels/${channelId}/messages`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `${playerName} is playing`,
                }),
            }
        );

        return response.json();
    });
};
