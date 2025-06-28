import './App.css';
import Submit from './components/Submit';
import { AuthProvider } from './AuthProvider';
function App() {
    return (
        <AuthProvider>
            <p>hello world</p>
            <Submit />
        </AuthProvider>
    );
}

export default App;
