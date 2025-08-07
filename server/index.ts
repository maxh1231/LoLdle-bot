import dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import fastifyMysql, { MySQLPool } from '@fastify/mysql';

import { api } from './api/index.js';
declare module 'fastify' {
    interface FastifyInstance {
        mysql: MySQLPool;
    }
    interface FastifyRequest {
        rawBody?: string;
    }
}

const server = fastify();
server.register(fastifyMysql, {
    connectionString: `mysql://root:${process.env.MYSQL_ROOT_PASSWORD}@mysql/${process.env.MYSQL_NAME}`,
});

server.register(api, { prefix: '/api' });
server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
