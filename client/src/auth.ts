import type { Types } from '@discord/embedded-app-sdk';
import discordSdk from './discordSdk';
import { authStore } from './stores/authStore';
import type { IGuildsMembersRead } from './types/discord';

export const start = async () => {
    const { user } = authStore.getState();

    if (user != null) {
        return;
    }

    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        response_type: 'code',
        state: '',
        prompt: 'none',
        scope: [
            'applications.commands',
            // "applications.builds.upload",
            // "applications.builds.read",
            // "applications.store.update",
            // "applications.entitlements",
            // "bot",
            'identify',
            // "connections",
            // "email",
            // "gdm.join",
            'guilds',
            // "guilds.join",
            'guilds.members.read',
            // "messages.read",
            // "relationships.read",
            'rpc.activities.write',
            // "rpc.notifications.read",
            // 'rpc.voice.write',
            // 'rpc.voice.read',
            // "webhook.incoming",
            // discordSdk.guildId == null ? 'dm_channels.read' : null, // This scope requires approval from Discord.
        ].filter((scope) => scope != null) as Types.OAuthScopes[],
    });
    const getToken = await fetch('/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code,
        }),
    });

    const { access_token } = await getToken.json();
    const authToken = await discordSdk.commands.authenticate({
        access_token,
    });

    const guildMember = await fetch(
        `https://discord.com/api/users/@me/guilds/${discordSdk.guildId}/member`,
        {
            method: 'get',
            headers: { Authorization: `Bearer ${access_token}` },
        }
    )
        .then((j) => j.json<IGuildsMembersRead>())
        .catch(() => {
            return null;
        });

    const authState = {
        ...authToken,
        user: {
            ...authToken.user,
            id:
                new URLSearchParams(window.location.search).get('user_id') ??
                authToken.user.id,
        },
        guildMember,
    };

    authStore.setState({
        ...authState,
    });
};
