import { FastifyInstance } from 'fastify';

export const discord = async (server: FastifyInstance) => {
    server.post<{
        Body: {
            username: string;
            avatar: string;
            classic: number[][];
        };
    }>('/message', async (request, reply) => {
        console.log(request.body);
    });
};
