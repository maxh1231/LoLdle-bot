import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { FastifyInstance } from 'fastify';

export const token = async (server: FastifyInstance) => {
    server.post<{
        Body: {
            code: string;
        };
    }>(
        '/',
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
            console.log('api received access_code', code);
            const response = await fetch(
                'https://discord.com/api/oauth2/token',
                {
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
                }
            );

            const { access_token } = (await response.json()) as {
                access_token: string;
            };
            return reply
                .header('Access-Control-Allow-Origin', '*')
                .send({ access_token });
        }
    );
};
