import { ClassicGuess, Submit } from '../components';
import { useState } from 'react';
import type { Champion } from '../types/champion';

// Development DailyChampion
const DailyChampion: Champion = {
    champion_name: 'Alistar',
    gender: 'M',
    positions: ['Support'],
    range_type: ['Melee'],
    regions: ['Runeterra'],
    release_date: '2009-02-21',
    resource: 'Mana',
    species: ['Minotaur'],
};

const Classic = () => {
    const [attempt, setAttempts] = useState<Champion[] | null>(null);
    const colHeader = 'flex justify-center items-center w-17 h-18';
    return (
        <section className='flex flex-col m-auto'>
            <Submit setAttempts={setAttempts} />
            {attempt && attempt.length > 0 && (
                <div className='mx-auto w-[576px] grid grid-cols-8 gap-y-4 text-center'>
                    <h2 className={colHeader}>Champion</h2>
                    <h2 className={colHeader}>Gender</h2>
                    <h2 className={colHeader}>Position(s)</h2>
                    <h2 className={colHeader}>Species</h2>
                    <h2 className={colHeader}>Resource</h2>
                    <h2 className={colHeader}>Range Type</h2>
                    <h2 className={colHeader}>Region(s)</h2>
                    <h2 className={colHeader}>Release Year</h2>
                    {attempt.map((item, i) => (
                        <ClassicGuess
                            key={i}
                            attempt={item}
                            solution={DailyChampion}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Classic;
