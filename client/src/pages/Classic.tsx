import { ClassicGuess, Submit } from '../components';
import { useState } from 'react';
import type { Champion } from '../types/champion';
// Obtain daily champion
// State that holds attempt
// map attempt, rendering ClassicGuess
// Should ClassicGuess accept a prop for daily champion, or obtain daily champion itself?
// If obtained itself, possibly redundant requests
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
            <Submit />
            {attempt &&
                attempt.length > 0 &&
                attempt.map((item) => (
                    <ClassicGuess
                        attempt={item}
                        solution={DailyChampion}
                        setAttempts={setAttempts}
                    />
                ))}
        </section>
    );
};

export default Classic;
