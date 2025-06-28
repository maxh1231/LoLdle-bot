import { useState, useEffect } from 'react';
import championData from '../assets/championData.json';
import type { Champion } from '../types/champion';
import { getChampionSquare } from '../utils/getChampionUtils';

const Submit = () => {
    const [search, setSearch] = useState<string | null>(null);
    const [searchOptions, setSearchOptions] = useState<Champion[] | null>(null);
    const champions: Champion[] = championData;

    useEffect(() => {
        const matches = champions.filter((item) => {
            if (search) {
                return item.champion_name
                    .toLowerCase()
                    .startsWith(search.toLowerCase());
            }
        });
        matches.forEach((item) => {
            if (!item.img) {
                getChampionSquare(
                    item.champion_name.replace(/[^a-zA-Z]/g, '').toLowerCase()
                ).then((url) => {
                    item.img = url;
                });
            }
        });
        setSearchOptions(matches);
        console.log(searchOptions);
    }, [search]);

    return (
        <div>
            <input onChange={(e) => setSearch(e.target.value)} type='text' />
            {searchOptions &&
                searchOptions.map((item) => (
                    <div>
                        <img src={item.img} alt={item.champion_name} />
                        <p>{item.champion_name}</p>
                    </div>
                ))}
        </div>
    );
};

export default Submit;
