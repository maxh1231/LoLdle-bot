import redis from './conn.js';
const WINDOW_MS = 36000000;
const BUCKET = 'default';
export type LastMessageResponse =
    | { withinEditWindow: true; state: MessageState }
    | { withinEditWindow: false };

interface LastMessageRequest {
    guild_id: string;
    channel_id: string;
    message_id?: string;
    now: number;
    newState?: MessageState;
}

interface UserPerformance {
    username: string;
    avatar: string;
    classic: number[][];
    quote?: number[];
    ability?: number[];
    emoji?: number[];
    splash?: number[];
}

interface MessageState {
    message_id: string;
    updatedAt: number;
    version: number;
    userPerformance: UserPerformance[];
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
    guild_id,
    channel_id,
    now = Date.now(),
}: LastMessageRequest): Promise<LastMessageResponse> => {
    const rkey = keyFor(guild_id, channel_id, BUCKET);
    const raw = await redis.get(rkey);

    if (!raw) {
        return { withinEditWindow: false };
    }

    const state = JSON.parse(raw) as MessageState;
    const age = now - state.updatedAt;

    if (!Number.isFinite(state.updatedAt) || age >= WINDOW_MS) {
        return { withinEditWindow: false };
    }

    return { withinEditWindow: true, state };
};

export const updateLastMessage = async ({
    guild_id,
    channel_id,
    now = Date.now(),
    newState,
}: LastMessageRequest) => {
    const rkey = keyFor(guild_id, channel_id, BUCKET);
    if (!newState) return new Error('newState required');
    newState.updatedAt = now;
    await redis.set(rkey, JSON.stringify(newState), 'PX', WINDOW_MS);
};
