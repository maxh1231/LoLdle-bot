import { FastifyInstance } from 'fastify';
import { MySQLRowDataPacket } from '@fastify/mysql';

// FutureDev/TODO: This function can likely be ported to also handle the other
// game modes besides 'Classic'.
// It will need to be determined if the /classic route should be changed
// to /daily and return an object of all modes' daily champion, or a route
// for each mode.
export const getClassicDailyChampion = (
    server: FastifyInstance
): Promise<number> => {
    return new Promise((resolve, reject) => {
        server.mysql.query<MySQLRowDataPacket[]>(
            'SELECT * FROM classic_daily ORDER BY id DESC LIMIT 1',
            (err, result) => {
                if (err) return reject(err);
                resolve(result[0].champion_id);
            }
        );
    });
};
