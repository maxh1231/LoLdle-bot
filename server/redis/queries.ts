import type Redis from 'ioredis';

export type LastMessageResponse =
    | { exceedsWindow: false; messageId: string }
    | { exceedsWindow: true };

interface LastMessageRequest {
    redis: Redis;
    guildId: string;
    channelId: string;
    bucket?: string;
    messageId?: string;
    windowMs: number;
    now?: number;
}
export const getLastMessage = async ({
    redis,
    guildId,
    channelId,
    bucket = 'default',
    windowMs,
    now = Date.now(),
}: LastMessageRequest): Promise<LastMessageResponse> => {
    const rkey = `lastmsg:${guildId}:${channelId}:${bucket}`;
    const raw = await redis.get(rkey);

    if (!raw) {
        return { exceedsWindow: true };
    }

    const { messageId, updatedAt } = JSON.parse(raw) as {
        messageId: string;
        updatedAt: number;
    };
    const age = now - updatedAt;

    if (age < windowMs) {
        return { exceedsWindow: false, messageId };
    }

    return { exceedsWindow: true };
};

export const updateLastMessage = async ({
    redis,
    guildId,
    channelId,
    bucket = 'default',
    messageId,
    windowMs,
    now = Date.now(),
}: LastMessageRequest) => {
    const rkey = `lastmsg:${guildId}:${channelId}:${bucket}`;
    await redis.set(
        rkey,
        JSON.stringify({ messageId, updatedAt: now }),
        'PX',
        windowMs
    );
};
