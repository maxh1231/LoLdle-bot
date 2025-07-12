import { useState, useEffect, KeyboardEvent } from 'react';
import championData from '../assets/championData.json';
import type { Champion } from '../types/champion';
import { buildImgUrl } from '../helpers/getChampionUtils';

const Submit = ({
    setAttempts,
}: {
    setAttempts: React.Dispatch<React.SetStateAction<Champion[] | null>>;
}) => {
    const [search, setSearch] = useState<string | null>(null);
    const [searchOptions, setSearchOptions] = useState<Champion[]>([]);
    const [champions, setChampions] = useState<Champion[]>(championData);

    useEffect(() => {
        const matches = champions.filter((item) => {
            if (search) {
                return item.champion_name
                    .toLowerCase()
                    .startsWith(search.toLowerCase());
            }
        });
        setSearchOptions(matches);
    }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSelection = (selectedChampion: Champion) => {
        setAttempts((prev) =>
            prev ? [selectedChampion, ...prev] : [selectedChampion]
        );
        setSearch(null);
        // TODO: Handle this more elegantly if possible, currently O(n), ideally O(1)
        setChampions(champions.filter((item) => item != selectedChampion));
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && searchOptions.length > 0) {
            handleSelection(searchOptions[0]);
        }
    };

    return (
        <div className='mx-auto mt-72 relative max-w-[346px]'>
            <input
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                type='text'
                value={search ? search : ''}
                className='w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300'
                placeholder='Type a champion name...'
            />
            {searchOptions.length > 0 && (
                <div className='absolute w-full max-h-[292px]  overflow-y-scroll bg-[#1E2328] border-2 border-black z-10'>
                    {searchOptions.map((item, i) => (
                        <div
                            key={i}
                            className='m-2 flex flex-row items-center space-x-4 cursor-pointer hover:bg-neutral-700'
                            onClick={() => handleSelection(item)}
                        >
                            <img
                                src={item.img}
                                alt={item.champion_name}
                                className='w-12 h-12'
                            />
                            <p className='text-bold text-lg'>
                                {item.champion_name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Submit;
