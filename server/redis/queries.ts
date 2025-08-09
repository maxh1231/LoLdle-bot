import type Redis from 'ioredis';

export type LastMessageResponse =
    | { exceedsWindow: false; message_id: string }
    | { exceedsWindow: true };

interface LastMessageRequest {
    redis: Redis;
    guild_id: string;
    channel_id: string;
    bucket?: string;
    message_id?: string;
    windowMs: number;
    now?: number;
}

export const keyFor = (
    guild_id: string,
    channel_id: string,
    bucket = 'default'
) => `lastmsg:${guild_id}:${channel_id}:${bucket}`;

export const streamId = (
    guild_id: string,
    channel_id: string,
    bucket = 'default'
) => `${guild_id}:${channel_id}:${bucket}`;

export const getLastMessage = async ({
    redis,
    guild_id,
    channel_id,
    bucket = 'default',
    windowMs,
    now = Date.now(),
}: LastMessageRequest): Promise<LastMessageResponse> => {
    const rkey = keyFor(guild_id, channel_id, bucket);
    const raw = await redis.get(rkey);

    if (!raw) {
        return { exceedsWindow: true };
    }

    const { message_id, updatedAt } = JSON.parse(raw) as {
        message_id: string;
        updatedAt: number;
    };
    const age = now - updatedAt;

    if (age < windowMs) {
        return { exceedsWindow: false, message_id };
    }

    return { exceedsWindow: true };
};

export const updateLastMessage = async ({
    redis,
    guild_id,
    channel_id,
    bucket = 'default',
    message_id,
    windowMs,
    now = Date.now(),
}: LastMessageRequest) => {
    const rkey = keyFor(guild_id, channel_id, bucket);
    await redis.set(
        rkey,
        JSON.stringify({ message_id, updatedAt: now }),
        'PX',
        windowMs
    );
};
