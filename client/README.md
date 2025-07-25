# LoLdle-bot Client

Our standard TypeScript/React client is embedded into Discord's client via [@discord/embedded-app-sdk](https://github.com/discord/embedded-app-sdk).

## Browser

If the client is loaded in the browser, mocked discord user and server data is provided to the SDK which skips the authentication of a user and server. This allows more rapid developement to take place in the browser.

<details>
  <summary>DiscordSDKMock</summary>

```js
export class DiscordSDKMock implements IDiscordSDK {
  readonly clientId: string;
  readonly platform = Platform.DESKTOP;
  readonly instanceId = '123456789012345678';
  readonly customId: string | null;
  readonly referrerId: string | null;
  readonly configuration = getDefaultSdkConfiguration();
  readonly source: Window | WindowProxy | null = null;
  readonly sourceOrigin: string = '';
  readonly sdkVersion = 'mock';
  readonly mobileAppVersion = 'unknown';

  private frameId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  private eventBus = new EventEmitter();
  public commands: IDiscordSDK['commands'];
  readonly guildId: string | null;
  readonly channelId: string | null;
  readonly locationId: string | null;

  constructor(clientId: string, guildId: string | null, channelId: string | null, locationId: string | null) {
    this.clientId = clientId;

    this.commands = this._updateCommandMocks({});
    this.guildId = guildId;
    this.channelId = channelId;
    this.locationId = locationId;
    this.customId = null;
    this.referrerId = null;
  }

  _updateCommandMocks(newCommands: Partial<IDiscordSDK['commands']>) {
    // Wrap all the command functions with logging
    this.commands = transform(Object.assign({}, commandsMockDefault, newCommands), (mock, func, name) => {
      mock[name as keyof IDiscordSDK['commands']] = async (...args: any[]) => {
        console.info(`DiscordSDKMock: ${String(name)}(${JSON.stringify(args)})`);
        return await (func as (...args: any[]) => any)(...args);
      };
    });
    // redundant return here to satisfy the constructor defining commands
    return this.commands;
  }

  emitReady() {
    this.emitEvent('READY', undefined);
  }

  close(...args: any[]) {
    console.info(`DiscordSDKMock: close(${JSON.stringify(args)})`);
  }

  ready() {
    return Promise.resolve();
  }

  async subscribe<K extends keyof typeof EventSchema>(
    event: K,
    listener: (event: zod.infer<(typeof EventSchema)[K]['payload']>['data']) => unknown,
    ..._subscribeArgs: MaybeZodObjectArray<(typeof EventSchema)[K]>
  ) {
    return await this.eventBus.on(event, listener);
  }

  async unsubscribe<K extends keyof typeof EventSchema>(
    event: K,
    listener: (event: zod.infer<(typeof EventSchema)[K]['payload']>['data']) => unknown,
    ..._unsubscribeArgs: MaybeZodObjectArray<(typeof EventSchema)[K]>
  ): Promise<unknown> {
    return await this.eventBus.off(event, listener);
  }

  emitEvent<T>(event: string, data: T) {
    this.eventBus.emit(event, data);
  }
}
/** Default return values for all discord SDK commands */
export const commandsMockDefault: IDiscordSDK['commands'] = {
  authorize: () => Promise.resolve({code: 'mock_code'}),
  authenticate: () =>
    Promise.resolve({
      access_token: 'mock_token',
      user: {
        username: 'mock_user_username',
        discriminator: 'mock_user_discriminator',
        id: 'mock_user_id',
        avatar: null,
        public_flags: 1,
      },
      scopes: [],
      expires: new Date(2121, 1, 1).toString(),
      application: {
        description: 'mock_app_description',
        icon: 'mock_app_icon',
        id: 'mock_app_id',
        name: 'mock_app_name',
      },
    }),
  setActivity: () =>
    Promise.resolve({
      name: 'mock_activity_name',
      type: 0,
    }),
  getChannel: () =>
    Promise.resolve({
      id: 'mock_channel_id',
      name: 'mock_channel_name',
      type: ChannelTypesObject.GUILD_TEXT,
      voice_states: [],
      messages: [],
    }),
  getSkus: () => Promise.resolve({skus: []}),
  getEntitlements: () => Promise.resolve({entitlements: []}),
  startPurchase: () => Promise.resolve([]),
  setConfig: () => Promise.resolve({use_interactive_pip: false}),
  userSettingsGetLocale: () => Promise.resolve({locale: ''}),
  openExternalLink: () => Promise.resolve({opened: false}),
  encourageHardwareAcceleration: () => Promise.resolve({enabled: true}),
  captureLog: () => Promise.resolve(null),
  setOrientationLockState: () => Promise.resolve(null),
  openInviteDialog: () => Promise.resolve(null),
  getPlatformBehaviors: () =>
    Promise.resolve({
      iosKeyboardResizesView: true,
    }),
  getChannelPermissions: () => Promise.resolve({permissions: bigInt(1234567890) as unknown as bigint}),
  openShareMomentDialog: () => Promise.resolve(null),
  shareLink: () => Promise.resolve({success: false, didSendMessage: false, didCopyLink: false}),
  initiateImageUpload: () =>
    Promise.resolve({
      image_url:
        'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b52aa9e99b832574a53_full_logo_blurple_RGB.png',
    }),
  getInstanceConnectedParticipants: () => Promise.resolve({participants: []}),
  getRelationships: () =>
    Promise.resolve({
      relationships: [
        {
          type: 1,
          user: {
            username: 'mock_friend_username',
            flags: 0,
            bot: false,
            discriminator: 'mock_friend_discriminator',
            id: 'mock_friend_id_1',
            avatar: null,
          },
        },
        {
          type: 1,
          user: {
            username: 'mock_friend_username_with_nickname',
            flags: 0,
            bot: false,
            discriminator: 'mock_friend_discriminator_with_nickname',
            id: 'mock_friend_id_2',
            avatar: null,
          },
          nickname: 'mock_friend_nickname_for_user',
        },
        {
          type: 1,
          user: {
            username: 'mock_friend_username_with_since',
            flags: 0,
            bot: false,
            discriminator: 'mock_friend_discriminator_with_since',
            id: 'mock_friend_id_3',
            avatar: null,
          },
          since: '2021-06-29T00:32:37.180813+00:00',
        },
      ],
    }),
  inviteUserEmbedded: () => Promise.resolve(null),
  getUser: () => {
    return Promise.resolve({
      username: 'mock_friend_username',
      flags: 0,
      bot: false,
      discriminator: 'mock_friend_discriminator',
      id: 'mock_friend_id_1',
      avatar: null,
    });
  },
};
```

</details>

As such, more robust mocking of Discord's environment is possible and certainly needed for solid testing. (WIP)

## Discord Client

#### Prerequisites

- Registered Discord application
- [ Cloudflared ](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)

To launch LoLdle-bot in Discord's client:

1. Provide application's credentials to the root `.env` file.
2. Start LoLdle-bot client with `npm run dev`.
3. Create a Cloudflared tunnel to expose dev server: `cloudflared tunnel --url http://localhost:5173`.
4. In your application's dashboard in the Discord Developer Portal, navigate to `URL Mappings` and add the generated Cloudflared URL with a `/` prefix.
    - Add the same URL under `Proxy Path Mappings` with the `/.proxy/` prefix. This automatically proxies external requests with `/.proxy/some/url`.

**_Note:_** Long term development inside Discord's client is not recommended due to the cumbersome process of reloading an Activity. The majority of development can take place in the browser.

[Official Discord Activity Docs](https://discord.com/developers/docs/activities/overview)
