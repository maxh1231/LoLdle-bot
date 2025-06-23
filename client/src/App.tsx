import './App.css';
import { useState, useEffect } from 'react';
import { AuthProvider } from './AuthProvider';
import ClassicChampion from './components/ClassicChampion';
import { getChampionSquare } from './utils/getChampionUtils';
import type { Champion } from './types/champion';
function App() {
    const [champ, setChamp] = useState<Champion | null>(null);
    useEffect(() => {
        (async () => {
            const img = await getChampionSquare('Zed');
            console.log(img);
            setChamp({
                champion_name: 'Zed',
                gender: 'M',
                img: img,
                positions: ['Mid'],
                resource: 'Energy',
                range_type: 'Melee',
                regions: ['Ionia'],
                release_year: 2012,
                species: ['Human'],
            });
        })();
    }, []);

    return (
        <AuthProvider>
            <p>hello world</p>
            {champ && <ClassicChampion data={champ} />}
        </AuthProvider>
    );
}

export default App;
