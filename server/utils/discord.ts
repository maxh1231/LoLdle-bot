import { verifyKey } from 'discord-interactions';
import { FastifyRequest } from 'fastify';
import { Buffer } from 'buffer';
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
