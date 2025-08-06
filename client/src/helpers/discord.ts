import discordSdk from '../discordSdk';

export const getGuildTextChannels = async () => {
    return discordSdk.commands.getChannel({
        channel_id: discordSdk.channelId!,
    });
};

export const sendMessage = async (
    message: string,
    avatar: string
): Promise<void> => {
    await fetch(`/discord/message`, {
        method: 'GET',
        body: JSON.stringify({
            message: message,
            avatar: avatar,
        }),
    });
};
