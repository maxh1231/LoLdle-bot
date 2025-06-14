import fastify from 'fastify';
import { JSONSchemaType } from 'ajv';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const server = fastify();

export interface DiscordToken {
    client_id: string;
    client_secret: string;
    grant_type: 'authorization_code';
    code: string;
}

export const discordTokenSchema: JSONSchemaType<DiscordToken> = {
    $id: 'TokenRequest',
    type: 'object',
    properties: {
        client_id: { type: 'string' },
        client_secret: { type: 'string' },
        grant_type: { type: 'string', const: 'authorization_code' },
        code: { type: 'string' },
    },
    required: ['client_id', 'client_secret', 'grant_type', 'code'],
    additionalProperties: false,
};
server.addSchema(discordTokenSchema);
server.post<{
    Body: {
        code: string;
    };
}>(
    '/api/token',
    {
        schema: {
            body: {
                type: 'object',
                properties: {
                    code: { type: 'string' },
                },
                required: ['code'],
                additionalProperties: false,
            },
        },
    },
    async (request, reply) => {
        const { code } = request.body;
        console.log(code);
        const response = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.VITE_DISCORD_CLIENT_ID!,
                client_secret: process.env.DISCORD_CLIENT_SECRET!,
                grant_type: 'authorization_code',
                code,
            }),
        });

        const { access_token } = await response.json();
        return reply.send(access_token);
    }
);
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
