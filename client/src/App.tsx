import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Landing, Classic } from './pages';

interface DailyChampion {
    classic: number;
    // mode: number,
    // mode: number,
    // mode: number,
}
function App() {
    const [dailyChampions, setDailyChampions] = useState<DailyChampion | null>(
        null
    );

    // Query local JSON with champion ID and pass Champion to props,
    // or pass champion ID to respective component and each component
    // queries local JSON?
    useEffect(() => {
        (async () => {
            // discord sdk may automatically proxy requests to /api
            const response = await fetch(`/api/champion/classic`);
            const data = await response.json();
            setDailyChampions({ classic: data.id });
        })();
    }, []);

    console.log(dailyChampions);
    return (
        <main className='min-h-screen'>
            <Routes>
                <Route path='/' element={<Landing />} />
                {/* May want to render one page with each modes' component */}
                {dailyChampions?.classic && (
                    <Route
                        path='/classic'
                        element={
                            <Classic solutionId={dailyChampions?.classic} />
                        }
                    />
                )}
            </Routes>
        </main>
    );
}

export default App;
