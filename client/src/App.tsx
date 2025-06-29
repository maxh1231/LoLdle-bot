import './App.css';
import Submit from './components/Submit';
import { AuthProvider } from './AuthProvider';
function App() {
    return (
        <AuthProvider>
            <p className='text-sm'>hello world</p>
            <Submit />
        </AuthProvider>
    );
}

export default App;
