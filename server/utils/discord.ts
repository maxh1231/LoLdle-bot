import { verifyKey } from 'discord-interactions';
import { FastifyRequest } from 'fastify';
import { APIUser, APIChannel, Snowflake } from 'discord-api-types/v10';

export const discordVerificationHandler = async (publicKey: string) => {
    return async (request: FastifyRequest, reply: any) => {
        const signature = request.headers['x-signature-ed25519'] as string;
        const timestamp = request.headers['x-signature-timestamp'] as string;
        const rawBody = request.rawBody as string;
        if (!signature || !timestamp) {
            return reply.code(401).send({ error: 'Missing signature headers' });
        }

        const isVerified = await verifyKey(
            rawBody,
            signature,
            timestamp,
            publicKey
        );
        if (!isVerified) {
            return reply.code(401).send({ error: 'Invalid signature' });
        }
    };
};

export const sendMessage = async (user: APIUser, channel_id: Snowflake) => {
    console.log(user.global_name, channel_id);
    try {
        const response = await fetch(
            `https://discord.com/api/v10/channels/${channel_id}/messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                },
                body: JSON.stringify({
                    content: `${user.global_name} started playing`,
                }),
            }
        );
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

export const getApplicationCommands = async () => {
    const response = fetch(
        `https://discord.com/api/v10/applications/${process.env.VITE_DISCORD_CLIENT_ID}/commands`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            },
        }
    );
};
