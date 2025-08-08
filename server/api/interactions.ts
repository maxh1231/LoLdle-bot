import { FastifyInstance } from 'fastify';
import { InteractionResponseType } from 'discord-interactions';
import { discordVerificationHandler } from '../utils/discord.js';
import {
    APIBaseInteraction,
    InteractionType,
    APIApplicationCommandInteractionData,
} from 'discord-api-types/v10';
import { sendMessage } from '../utils/discord.js';
type LoldlePing = APIBaseInteraction<InteractionType.Ping, undefined>;
type LoldleCommand = APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
>;

type LoldleInteraction = LoldlePing | LoldleCommand;
export const interactions = async (server: FastifyInstance) => {
    const discordVerification = await discordVerificationHandler(
        process.env.DISCORD_PUBLIC_KEY!
    );

    server.post<{
        Body: LoldleInteraction;
    }>(
        '/',
        {
            config: {
                rawBody: true,
            },
            preHandler: discordVerification,
            // TODO: Implement TypeBox for type -> JSON conversion
            // schema: {
            //     body: {
            //         type: 'object',
            //         properties: {
            //             id: { type: 'string' },
            //             application_id: { type: 'string' },
            //             type: { type: 'number' },
            //             data: { type: 'null' },
            //         },
            //         required: ['id', 'application_id'],
            //         additionalProperties: false,
            //     },
            // },
        },
        async (request, reply) => {
            const { id, application_id, type, user, channel } = request.body;
            console.log('Discord interaction received', {
                id,
                type,
                application_id,
                user,
            });

            if (type === InteractionType.Ping) {
                server.log.info('Responding to Discord PING');
                return reply.code(200).send({
                    type: InteractionResponseType.PONG,
                    message: 'PONG',
                });
            }

            // APPLICATION_COMMAND

            if (type === InteractionType.ApplicationCommand) {
                reply.send({
                    type: InteractionResponseType.LAUNCH_ACTIVITY,
                });
                await sendMessage(user, channel);
            }
        }
    );
};
