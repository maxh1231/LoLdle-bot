import './App.css';
import { AuthProvider } from './AuthProvider';
import { Link } from 'react-router';
function App() {
    return (
        <AuthProvider>
            <p className='text-sm'>Loldle</p>
            <Link to={'/classic'}>Classic Mode</Link>
        </AuthProvider>
    );
}

export default App;
