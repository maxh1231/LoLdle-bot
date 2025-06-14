import './App.css';
import { DiscordSDK } from '@discord/embedded-app-sdk';

function App() {
    console.log(import.meta.env.VITE_DISCORD_CLIENT_ID);
    const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
    setupDiscordSdk().then(() => {
        console.log('Discord SDK ready');
    });

    async function setupDiscordSdk() {
        await discordSdk.ready();
    }

    return (
        <>
            <p>hello world</p>
        </>
    );
}

export default App;
