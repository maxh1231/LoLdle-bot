import { Link } from 'react-router';
const Landing = () => {
    return (
        <section>
            <p>Welcome to LoLdle</p>
            <Link to={'classic'}>Classic Mode</Link>
        </section>
    );
};

export default Landing;
