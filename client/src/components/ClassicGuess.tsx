import type { Champion } from '../types/champion';
interface ClassicGuessProps {
    attempt: Champion;
    solution: Champion;
    setAttempts: React.Dispatch<React.SetStateAction<Champion[] | null>>;
}
const ClassicGuess: React.FC<ClassicGuessProps> = ({
    attempt,
    solution,
    setAttempts,
}) => {
    return (
        <div>
            <div>
                <h2>Champion</h2>
                <div>
                    <img src={attempt.img} alt='champion image' />
                </div>
            </div>
            <div>
                <h2>Gender</h2>
                <span>{attempt.gender}</span>
            </div>
            <div>
                <h2>Position(s)</h2>
            </div>
            <div>
                <h2>Species</h2>
            </div>
            <div>
                <h2>Resource</h2>
                <span>{attempt.resource}</span>
            </div>
            <div>
                <h2>Range Type</h2>
                <span>{attempt.range_type}</span>
            </div>
            <div>
                <h2>Region(s)</h2>
            </div>
            <div>
                <h2>Release Year</h2>
                <span>{attempt.release_date}</span>
            </div>
        </div>
    );
};

export default ClassicGuess;
