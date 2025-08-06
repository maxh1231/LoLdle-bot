import { FastifyInstance } from 'fastify';

export const discord = async (server: FastifyInstance) => {
    server.post<{
        Body: {
            type: number;
            data: string;
        };
    }>(
        '/interaction',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        type: { type: 'number' },
                        data: { type: 'string' },
                    },
                    required: ['type'],
                    additionalProperties: false,
                },
            },
        },
        async (request, reply) => {
            const { type, data } = request.body;

            if (type === 1) {
                return reply.send({ type: 1 });
            }

            // APPLICATION_COMMAND
            if (type === 2) {
                return reply.send({
                    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
                    data: {
                        content: `🎮 Welcome! You used the command: /${data.name}`,
                    },
                });
            }
        }
    );
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
