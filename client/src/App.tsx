import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Landing, Classic } from './pages';
import { authStore } from './stores/authStore';
import { sendMessage } from './helpers/discord';

interface DailyChampion {
    classic: number;
    // mode: number,
    // mode: number,
    // mode: number,
}
interface UserPerformance {
    classic: number[][];
    // mode: number,
    // mode: number,
    // mode: number,
}
function App() {
    const [dailyChampions, setDailyChampions] = useState<DailyChampion | null>(
        null
    );
    const [userPerformance, setUserPerformance] = useState<UserPerformance>({
        classic: [[0, 0, 0, 0, 0, 0, 0]],
    });
    const [notifyGuild, setNotifyGuild] = useState<boolean>(false);

    // Query local JSON with champion ID and pass Champion to props,
    // or pass champion ID to respective component and each component
    // queries local JSON?
    useEffect(() => {
        (async () => {
            // discord sdk may automatically proxy requests to /api
            //
            if (!dailyChampions) {
                const response = await fetch(`/api/champion/classic`);
                const data = await response.json();
                setDailyChampions({ classic: data.id });
            }

            console.log(authStore.getState());
            if (notifyGuild) {
                await sendMessage(userPerformance.classic);
            }
        })();
    }, [dailyChampions, notifyGuild]);

    return (
        <main className='min-h-screen'>
            <Routes>
                <Route path='/' element={<Landing />} />
                {/* May want to render one page with each modes' component */}
                {dailyChampions?.classic && (
                    <Route
                        path='/classic'
                        element={
                            <Classic
                                solutionId={dailyChampions?.classic}
                                setNotifyGuild={setNotifyGuild}
                            />
                        }
                    />
                )}
            </Routes>
        </main>
    );
}

export default App;
