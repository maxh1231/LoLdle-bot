import { FastifyInstance } from 'fastify/types/instance';
import { verifyKey } from 'discord-interactions';
export const handleDiscordInteraction = async (
    server: FastifyInstance,
    options: {
        publicKey: string;
    }
) => {
    const { publicKey } = options;

    // Parse JSON but keep raw body for signature verification
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

    // Verify Discord signature
    server.addHook('preValidation', async (request, reply) => {
        const signature = request?.headers['x-signature-ed25519'] as string;
        const timestamp = request?.headers['x-signature-timestamp'] as string;
        const rawBody = request?.rawBody;

        if (!verifyKey(rawBody!, signature, timestamp, publicKey)) {
            return reply.code(401).send({ error: 'Invalid signature' });
        }
    });
};
