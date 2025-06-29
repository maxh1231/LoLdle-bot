import './App.css';
import Submit from './components/Submit';
import { AuthProvider } from './AuthProvider';
function App() {
    return (
        <AuthProvider>
            <section className='w-full'>
                <p className='text-sm'>hello world</p>
                <Submit />
            </section>
        </AuthProvider>
    );
}

export default App;
