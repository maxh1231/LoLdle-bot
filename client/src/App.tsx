import './App.css';
import { useEffect, useState } from 'react';
import Submit from './components/Submit';
import { AuthProvider } from './AuthProvider';
import { getChampionSquare } from './utils/getChampionUtils';
function App() {
    const [test, setTest] = useState<string | null>(null);
    useEffect(() => {
        const handler = async () => {
            const img = await getChampionSquare('zed');
            setTest(img);
        };
        handler();
    }, []);

    return (
        <AuthProvider>
            {test && <img src={test} />}
            <p>hello world</p>
            <Submit />
        </AuthProvider>
    );
}

export default App;
