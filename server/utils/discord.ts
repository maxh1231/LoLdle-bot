import { verifyKey } from 'discord-interactions';
import { FastifyRequest } from 'fastify';
import { APIUser, APIChannel } from 'discord-api-types/v10';

export const discordVerificationHandler = async (publicKey: string) => {
    return async (request: FastifyRequest, reply: any) => {
        const signature = request.headers['x-signature-ed25519'] as string;
        const timestamp = request.headers['x-signature-timestamp'] as string;
        const rawBody = request.rawBody as string;
        console.log(signature, timestamp, rawBody);
        if (!signature || !timestamp) {
            return reply.code(401).send({ error: 'Missing signature headers' });
        }

        const isVerified = await verifyKey(
            rawBody,
            signature,
            timestamp,
            publicKey
        );
        console.log(isVerified);
        if (!isVerified) {
            return reply.code(401).send({ error: 'Invalid signature' });
        }
    };
};

export const sendMessage = async (user: APIUser, channel: APIChannel) => {
    await fetch(`https://discord.com/api/v10/channels/${channel.id}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
        body: new URLSearchParams({
            content: `${user.username} started playing`,
        }),
    });
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
