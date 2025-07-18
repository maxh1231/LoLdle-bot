## Welcome to LoLdle-bot

LoLdle-bot is a [ LoLdle ](https://loldle.net/) port to a Discord Activity. Discord Activities are webpages embedded into Discord's client with a few important differences and caveats.

Checkout Discord's most popular Activity, [ Wordle ](https://discord.com/discovery/applications/1211781489931452447), which demonsrates how Discord servers use and interact with them.

## Installation

#### Prerequisites

- NodeJS
- Docker
- Registered Discord application with a Client ID and Client Secret **_(optional)_**

#### Installation

1. Clone repository.
2. Install npm dependencies in both `client/` and `server/` directories.
3. Create a `.env` file at the root of the project and copy the contents of `.env.example` to it.
4. Supply values to the `MYSQL_NAME` and `MYSQL_ROOT_PASSWORD` variables in the `.env` file you created.
5. Supply values to the `VITE_DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` for usage inside Discord's client. **_(optional)_**
