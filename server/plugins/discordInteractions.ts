import {
    verifyKey,
    InteractionType,
    InteractionResponseType,
} from 'discord-interactions';
const handleDiscordInteraction = async (server, options) => {
    const { publicKey } = options;

    // Parse JSON but keep raw body for signature verification
    server.addContentTypeParser(
        'application/json',
        { parseAs: 'string' },
        (req, body, done) => {
            try {
                req.rawBody = body;
                done(null, JSON.parse(body));
            } catch (err) {
                done(err, undefined);
            }
        }
    );

    // Verify Discord signature
    server.addHook('preValidation', async (request, reply) => {
        const signature = request.headers['x-signature-ed25519'];
        const timestamp = request.headers['x-signature-timestamp'];
        const rawBody = request.rawBody;

        if (!verifyKey(rawBody, signature, timestamp, publicKey)) {
            return reply.code(401).send({ error: 'Invalid signature' });
        }
    });
};
