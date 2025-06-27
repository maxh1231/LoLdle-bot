import { useState, useEffect } from 'react';
import championData from '../assets/championData.json';
import type { Champion } from '../types/champion';
const Submit = () => {
    const [search, setSearch] = useState<string | null>(null);
    const champions: Champion[] = championData;
    useEffect(() => {
        if (search) {
            const matches = champions.filter((item) =>
                item.champion_name.toLowerCase().includes(search?.toLowerCase())
            );
            console.log(matches);
        }
    }, [search, champions]);
    return (
        <div>
            <input onChange={(e) => setSearch(e.target.value)} type='text' />
        </div>
    );
};

export default Submit;
