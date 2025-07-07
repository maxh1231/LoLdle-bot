import dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import fastifyMysql from '@fastify/mysql';
import { api } from './api/index.js';
import { db } from './db/conn.js';

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
server.ready((err) => {
    if (err) throw err;
    server.mysql.query('DESCRIBE DailyChampion', (err, result) => {
        if (err) throw err;
        console.log(result);
    });
});
