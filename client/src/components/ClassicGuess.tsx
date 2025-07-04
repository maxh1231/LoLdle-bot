import type { Champion } from '../types/champion';
interface ClassicGuessProps {
    attempt: Champion;
    solution: Champion;
    key: number;
}
const ClassicGuess: React.FC<ClassicGuessProps> = ({ attempt, solution }) => {
    console.log(attempt, solution);
    return (
        <>
            <div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <h2>Champion</h2>
                </div>
                <img
                    className='w-17 h-16'
                    src={attempt.img}
                    alt='champion image'
                />
            </div>
            <div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <h2>Gender</h2>
                </div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <span>{attempt.gender}</span>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <h2>Position(s)</h2>
                </div>
                <div className='flex flex-col justify-center items-center w-17 h-18'>
                    {attempt.positions.map((item) => (
                        <>
                            <p className='text-base/5'>{item}</p>
                        </>
                    ))}
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <h2>Species</h2>
                </div>
                <div className='flex flex-col justify-center items-center w-17 h-18'>
                    {attempt.species.map((item) => (
                        <>
                            <p className='text-base/5'>{item}</p>
                        </>
                    ))}
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <h2>Resource</h2>
                </div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <span>{attempt.resource}</span>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <h2>Range Type</h2>
                </div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <span>{attempt.range_type}</span>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <h2>Region(s)</h2>
                </div>
                <div className='flex flex-col justify-center items-center w-17 h-18'>
                    {attempt.regions.map((item) => (
                        <>
                            <p className='text-base/5'>{item}</p>
                        </>
                    ))}
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <h2>Release Year</h2>
                </div>
                <div className='flex justify-center items-center w-17 h-18'>
                    <span>{attempt.release_date}</span>
                </div>
            </div>
        </>
    );
};

export default ClassicGuess;
