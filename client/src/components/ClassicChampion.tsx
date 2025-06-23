import type { Champion } from '../types/champion';
const ClassicChampion: React.FC<{ data: Champion }> = ({ data }) => {
    return (
        <section>
            <div>
                <h2>Champion</h2>
                <div>
                    <img src={data.img} alt='champion image' />
                </div>
            </div>
            <div>
                <h2>Gender</h2>
                <span>{data.gender}</span>
            </div>
            <div>
                <h2>Position(s)</h2>
            </div>
            <div>
                <h2>Species</h2>
            </div>
            <div>
                <h2>Resource</h2>
                <span>{data.resource}</span>
            </div>
            <div>
                <h2>Range Type</h2>
                <span>{data.range_type}</span>
            </div>
            <div>
                <h2>Region(s)</h2>
            </div>
            <div>
                <h2>Release Year</h2>
                <span>{data.release_year}</span>
            </div>
        </section>
    );
};

export default ClassicChampion;
