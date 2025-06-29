import { useState, useEffect } from 'react';
import championData from '../assets/championData.json';
import type { Champion } from '../types/champion';
import { buildImgUrl } from '../utils/getChampionUtils';

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
                item.img = buildImgUrl(item.champion_name);
            }
        });
        setSearchOptions(matches);
    }, [search]);

    return (
        <div>
            <input
                onChange={(e) => setSearch(e.target.value)}
                type='text'
                className='block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300'
                placeholder='Type a champion name...'
            />
            {searchOptions && (
                <div className='max-h-[292px] overflow-y-scroll bg-grey border-2 border-black'>
                    {searchOptions.map((item, i) => (
                        <div
                            key={i}
                            className=' m-2 flex flex-row items-center space-x-4 cursor-pointer hover:bg-neutral-700'
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
