"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const server = (0, fastify_1.default)();
server.post('/api/token', {
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
}, async (request, reply) => {
    const { code } = request.body;
    console.log('api received access_code', code);
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.VITE_DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
        }),
    });
    const { access_token } = await response.json();
    return reply
        .header('Access-Control-Allow-Origin', '*')
        .send({ access_token });
});
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
