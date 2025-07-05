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
    return (
        <section>
            <Submit setAttempts={setAttempts} />
            {attempt && attempt.length > 0 && (
                <section className='w-[576px] grid grid-cols-8 text-center'>
                    {attempt.map((item, i) => (
                        <ClassicGuess
                            key={i}
                            attempt={item}
                            solution={DailyChampion}
                        />
                    ))}
                </section>
            )}
        </section>
    );
};

export default Classic;
