import './App.css';
import { AuthProvider } from './AuthProvider';
function App() {
    return (
        <AuthProvider>
            <p>hello world</p>
        </AuthProvider>
    );
}

export default App;
