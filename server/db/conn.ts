import { FastifyInstance } from 'fastify';
import fastifyMysql, { MySQLPool } from '@fastify/mysql';
declare module 'fastify' {
    interface FastifyInstance {
        mysql: MySQLPool;
    }
}
export const db = (server: FastifyInstance) => {
    return server.register(fastifyMysql, {
        connectionString: `mysql://root:${process.env.MYSQL_ROOT_PASSWORD}@mysql/${process.env.MYSQL_NAME}`,
    });
};
