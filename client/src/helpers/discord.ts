export const sendMessage = async (
    channelId: number,
    content: string
): Promise<void> => {
    await fetch(`/discord/message`, {
        method: 'GET',
        body: JSON.stringify({
            channelId: channelId,
            content: content,
        }),
    });
};
