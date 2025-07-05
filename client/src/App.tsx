import { Routes, Route } from 'react-router';
import { Landing, Classic } from './pages';

function App() {
    return (
        <main className='min-h-screen'>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/classic' element={<Classic />} />
            </Routes>
        </main>
    );
}

export default App;
