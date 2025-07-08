import { FastifyInstance } from 'fastify';
export const championWeightSum = (server: FastifyInstance) => {
    server.mysql.query(
        'SELECT SUM(weight) FROM DailyChampions',
        (err, result) => {
            console.log(result);
        }
    );
};
