import redis from './conn.js';
const WINDOW_MS = 3600000;
const BUCKET = 'default';
export type LastMessageResponse =
    | { withinEditWindow: true; state: MessageState }
    | { withinEditWindow: false };

interface LastMessageRequest {
    guild_id: string;
    channel_id: string;
    message_id?: string;
    now?: number;
    newState?: Partial<MessageState>;
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
    message_id: string | null;
    updatedAt: number;
    userPerformance?: UserPerformance[] | null;
}

export const keyFor = (guild_id: string, channel_id: string) =>
    `lastmsg:${guild_id}:${channel_id}:${BUCKET}`;

export const streamId = (guild_id: string, channel_id: string) =>
    `${guild_id}:${channel_id}:${BUCKET}`;

export const getLastMessage = async ({
    guild_id,
    channel_id,
    now = Date.now(),
}: LastMessageRequest): Promise<LastMessageResponse> => {
    const rkey = keyFor(guild_id, channel_id);
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

export const setLastMessage = async ({
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
