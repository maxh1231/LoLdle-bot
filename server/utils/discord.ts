import { verifyKey } from 'discord-interactions';
import { FastifyRequest } from 'fastify';
import { APIUser, Snowflake, Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';

export const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_BOT_TOKEN!
);

export const discordVerificationHandler = async (publicKey: string) => {
    return async (request: FastifyRequest, reply: any) => {
        const signature = request.headers['x-signature-ed25519'] as string;
        const timestamp = request.headers['x-signature-timestamp'] as string;
        const rawBody = request.rawBody as string;
        if (!signature || !timestamp) {
            return reply.code(401).send({ error: 'Missing signature headers' });
        }

        const isVerified = await verifyKey(
            rawBody,
            signature,
            timestamp,
            publicKey
        );
        if (!isVerified) {
            return reply.code(401).send({ error: 'Invalid signature' });
        }
    };
};

export const createMessage = async (user: APIUser, channel_id: Snowflake) => {
    //console.log(user, channel_id);
    try {
        const response = await rest.post(Routes.channelMessages(channel_id), {
            body: {
                flags: 32768,
                components: [
                    {
                        type: 10,
                        content: `${user.global_name} started playing`,
                    },
                    {
                        type: 1,
                        components: [
                            {
                                type: 2,
                                style: 1,
                                label: 'Play now!',
                                custom_id: 'btn-play-now',
                            },
                        ],
                    },
                ],
            },
        });
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

// TODO: how to handle modifying existing message data rather than overwriting completely?
// Must the message be GET requested first? Redis?
export const editMessage = async (
    channel_id: Snowflake,
    message_id: Snowflake,
    newContent: string
) => {
    try {
        const response = await rest.patch(
            Routes.channelMessage(channel_id, message_id),
            {
                body: {
                    flags: 32768,
                    components: [
                        {
                            type: 10,
                            content: newContent,
                        },
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2,
                                    style: 1,
                                    label: 'Play now!',
                                    custom_id: 'btn-play-now',
                                },
                            ],
                        },
                    ],
                },
            }
        );
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};
