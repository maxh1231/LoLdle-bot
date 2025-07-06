import { appendComma } from '../helpers/utils';
import type { Champion } from '../types/champion';
interface ClassicGuessProps {
    attempt: Champion;
    solution: Champion;
}
// #09C22E - Green
// #D97E0D - Orange
// #DA160E - Red
type GuessColor = '#09C22E' | '#D97E0D' | '#DA160E';
const ClassicGuess: React.FC<ClassicGuessProps> = ({ attempt, solution }) => {
    const evalGuessAndApplyColor = (
        championProp: string[],
        comparator: string[]
    ): GuessColor => {
        if (JSON.stringify(championProp) == JSON.stringify(comparator))
            return '#09C22E';
        else if (championProp.some((item) => comparator.includes(item)))
            return '#D97E0D';
        return '#DA160E';
    };

    const evalReleaseYear = (year: number) => {
        const comparator = parseInt(solution.release_date.slice(0, 4));
        if (year == comparator)
            return (
                <div
                    style={{ backgroundColor: '#09C22E' }}
                    className='flex justify-center items-center w-17 h-18'
                >
                    <p>{year}</p>
                </div>
            );
        else if (year < comparator)
            return (
                <div
                    style={{ backgroundColor: '#DA160E' }}
                    className='flex justify-center items-center w-17 h-18'
                >
                    <svg width='' height='' viewBox='0 0 100 100'>
                        <rect width='100' height='100' fill='#DA160E' />
                        <polygon
                            points='50,4 100,50 80,50 80,90 20,90 20,50 0,50'
                            fill='#1B1F23'
                        />
                    </svg>
                    <p className='absolute text-base/5'>{year}</p>
                </div>
            );
        else
            return (
                <div
                    style={{ backgroundColor: '#DA160E' }}
                    className='flex justify-center items-center w-17 h-18'
                >
                    <svg width='100' height='100' viewBox='0 0 100 100'>
                        <rect width='100' height='100' fill='#DA160E' />
                        <polygon
                            points='50,96 100,50 80,50 80,10 20,10 20,50 0,50'
                            fill='#1B1F23'
                        />
                    </svg>
                    <p className='absolute text-base/5'>{year}</p>
                </div>
            );
    };

    return (
        <>
            <div>
                <img
                    className='w-17 h-18'
                    src={attempt.img}
                    alt='champion image'
                />
            </div>
            <div
                className='flex justify-center items-center w-17 h-18'
                style={{
                    backgroundColor: evalGuessAndApplyColor(
                        Array.from(attempt.gender),
                        Array.from(solution.gender)
                    ),
                }}
            >
                <p>{attempt.gender == 'X' ? 'Other' : attempt.gender}</p>
            </div>
            <div
                className='flex flex-col justify-center items-center w-17 h-18'
                style={{
                    backgroundColor: evalGuessAndApplyColor(
                        attempt.positions,
                        solution.positions
                    ),
                }}
            >
                {attempt.positions.map((position, i) => (
                    <p key={i} className='text-base/5'>
                        {appendComma(position, i, attempt.positions.length)}
                    </p>
                ))}
            </div>
            <div
                className='flex flex-col justify-center items-center w-17 h-18'
                style={{
                    backgroundColor: evalGuessAndApplyColor(
                        attempt.species,
                        solution.species
                    ),
                }}
            >
                {attempt.species.map((species, i) => (
                    <p key={i} className='text-base/5'>
                        {appendComma(species, i, attempt.species.length)}
                    </p>
                ))}
            </div>
            <div
                className='flex justify-center items-center w-17 h-18'
                style={{
                    backgroundColor: evalGuessAndApplyColor(
                        [attempt.resource],
                        [solution.resource]
                    ),
                }}
            >
                <p>{attempt.resource}</p>
            </div>
            <div
                className='flex flex-col justify-center items-center w-17 h-18'
                style={{
                    backgroundColor: evalGuessAndApplyColor(
                        attempt.range_type,
                        solution.range_type
                    ),
                }}
            >
                {attempt.range_type.map((type, i) => (
                    <p key={i} className='text-base/5'>
                        {appendComma(type, i, attempt.range_type.length)}
                    </p>
                ))}
            </div>
            <div
                className='flex flex-col justify-center items-center w-17 h-18'
                style={{
                    backgroundColor: evalGuessAndApplyColor(
                        attempt.regions,
                        solution.regions
                    ),
                }}
            >
                {attempt.regions.map((region, i) => (
                    <p key={i} className='text-base/5'>
                        {appendComma(region, i, attempt.regions.length)}
                    </p>
                ))}
            </div>
            {evalReleaseYear(parseInt(attempt.release_date.slice(0, 4)))}
        </>
    );
};

export default ClassicGuess;
