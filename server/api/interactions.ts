import { FastifyInstance } from 'fastify';
import { InteractionResponseType } from 'discord-interactions';
import { discordVerificationHandler } from '../utils/discord.js';
import {
    APIBaseInteraction,
    InteractionType,
    APIApplicationCommandInteractionData,
    APIMessageComponentInteractionData,
} from 'discord-api-types/v10';
import { sendMessage } from '../utils/discord.js';
type LoldleInteractionPing = APIBaseInteraction<
    InteractionType.Ping,
    undefined
>;
type LoldleInteractionCommand = APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
>;
type LoldleInteractionComponent = APIBaseInteraction<
    InteractionType.MessageComponent,
    APIMessageComponentInteractionData
>;

type LoldleInteraction =
    | LoldleInteractionPing
    | LoldleInteractionCommand
    | LoldleInteractionComponent;
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
            const { id, type, member, channel_id, token, message } =
                request.body;
            console.log('Discord interaction received', {
                id,
                type,
                member,
                channel_id,
                token,
                message,
            });

            if (type === InteractionType.Ping) {
                server.log.info('Responding to Discord PING');
                return reply.code(200).send({
                    type: InteractionResponseType.PONG,
                    message: 'PONG',
                });
            }

            // APPLICATION_COMMAND

            if (
                type === InteractionType.ApplicationCommand ||
                type === InteractionType.MessageComponent
            ) {
                await sendMessage(member!.user, channel_id!);
                return reply.send({
                    type: InteractionResponseType.LAUNCH_ACTIVITY,
                });
            }
        }
    );
};
