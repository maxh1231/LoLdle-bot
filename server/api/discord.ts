import { FastifyInstance } from 'fastify';

export const discord = async (server: FastifyInstance) => {
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
