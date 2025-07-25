import { FastifyInstance } from 'fastify';

export const discord = async (server: FastifyInstance) => {
    server.get('/message', async (request, reply) => {
        const { content, channelId } = request.params as {
            content: string;
            channelId: number;
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
                    content: content,
                }),
            }
        );

        return response.json();
    });
};
