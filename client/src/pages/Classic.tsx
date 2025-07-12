import { ClassicGuess, Submit } from '../components';
import { useState, useEffect } from 'react';
import type { Champion } from '../types/champion';
import championData from '../assets/championData.json';

interface ClassicProps {
    solutionId: number;
}
const Classic: React.FC<ClassicProps> = ({ solutionId }) => {
    const [attempt, setAttempts] = useState<Champion[] | null>(null);
    const [solution, setSolution] = useState<Champion | undefined>(undefined);
    const colHeader = 'flex justify-center items-center w-17 h-18';

    useEffect(() => {
        setSolution(championData.find((item) => item.id == solutionId));
    }, [solutionId]);
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
                    {solution &&
                        attempt.map((item, i) => (
                            <ClassicGuess
                                key={i}
                                attempt={item}
                                solution={solution}
                            />
                        ))}
                </div>
            )}
        </section>
    );
};

export default Classic;
