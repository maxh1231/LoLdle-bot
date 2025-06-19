import dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import { api } from './api/index.js';
const server = fastify();
server.register(api, { prefix: '/api' });
server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
