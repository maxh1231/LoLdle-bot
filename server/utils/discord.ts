import { verifyKey } from 'discord-interactions';
export const discordVerificationHandler = (publicKey: string) => {
    return async (request: any, reply: any) => {
        const signature = request.headers['x-signature-ed25519'] as string;
        const timestamp = request.headers['x-signature-timestamp'] as string;
        const rawBody = request.rawBody;

        console.log(signature, timestamp, rawBody);
        if (!signature || !timestamp) {
            return reply.code(401).send({ error: 'Missing signature headers' });
        }

        if (!verifyKey(rawBody!, signature, timestamp, publicKey)) {
            return reply.code(401).send({ error: 'Invalid signature' });
        }
    };
};
