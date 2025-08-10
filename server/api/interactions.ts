import { FastifyInstance } from 'fastify';
import { InteractionResponseType } from 'discord-interactions';
import { discordVerificationHandler } from '../utils/discord.js';
import {
    APIBaseInteraction,
    InteractionType,
    APIApplicationCommandInteractionData,
    APIMessageComponentInteractionData,
} from 'discord-api-types/v10';
import { getLastMessage, setLastMessage } from '../redis/queries.js';

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
            // schema: {}
        },
        async (request, reply) => {
            const { type, guild_id, channel } = request.body;
            if (!type || !guild_id || !channel)
                return new Error('Missing required data');
            console.log('Discord interaction received', {
                type,
                guild_id,
                channel,
            });

            if (type === InteractionType.Ping) {
                server.log.info('Responding to Discord PING');
                return reply.code(200).send({
                    type: InteractionResponseType.PONG,
                    message: 'PONG',
                });
            }

            if (
                type === InteractionType.ApplicationCommand ||
                type === InteractionType.MessageComponent
            ) {
                reply.send({
                    type: InteractionResponseType.LAUNCH_ACTIVITY,
                });

                const res = await getLastMessage({
                    guild_id: guild_id,
                    channel_id: channel.id,
                });
                if (!res.withinEditWindow)
                    await setLastMessage({
                        guild_id: guild_id,
                        channel_id: channel.id,
                        newState: { message_id: null, userPerformance: null },
                    });
            }
        }
    );
};
