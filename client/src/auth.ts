import type { CommandResponse, Types } from '@discord/embedded-app-sdk';
import discordSdk from './discordSdk';
import { create } from 'zustand';

type AuthContext = CommandResponse<'authenticate'>;

export const authStatus = create<AuthContext>(() => ({
    user: undefined as unknown as AuthContext['user'],
    access_token: '',
    scopes: [],
    expires: '',
    application: {
        rpc_origins: undefined,
        id: '',
        name: '',
        icon: null,
        description: '',
    },
}));
export const start = async () => {
    const { user } = authStatus.getState();

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

    const updateAuth = {
        ...authToken,
        user: {
            ...authToken.user,
            id:
                new URLSearchParams(window.location.search).get('user_id') ??
                authToken.user.id,
        },
    };

    authStatus.setState({
        ...updateAuth,
    });
};
