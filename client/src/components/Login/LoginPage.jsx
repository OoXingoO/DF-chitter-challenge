import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import AllPeeps from '../Peeps/AllPeeps';

const LoginPage = ({ setUser: setLoginUser }) => {

    const [peepData, setPeepData] = useState([]);
    const [getError, setGetError] = useState();
    const [user, setUser] = useState({
        username: ``,
        password: ``
    });

    const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const getPeepData = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/peeps`);
            setPeepData(res.data);
        } catch (error) {
            setGetError(error.message)
        }
    }

    useEffect(() => {
        getPeepData();
    }, []);

    const login = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:4000/login`, user);
        alert(res.data.message);
        setLoginUser(res.data.user);
        setUser({ username: ``, password: `` });
        setLoggedIn(res.data.user ? true : false);
    }

    return (
        <>
            {loggedIn && <Navigate to="/home" />}
            <div className='container-fluid'>
                <div className='row g-2'>
                    <div className='col-6 order-last'>
                        <div className='card mb-3' id='login-card'>
                            <h3>Log in Chitter:</h3>
                            <form onSubmit={login}>
                                <input type="text" id="sign-in-username" name="username" value={user.username} onChange={handleChange} placeholder="Enter username..." />
                                <br />
                                <input type="password" id="sign-in-password" name="password" value={user.password} onChange={handleChange} placeholder="Enter password..." />
                                <br />
                                <button type="submit" value="Login" className='btn btn-warning' >Login</button>
                            </form>
                            <Link to="/register">
                                Dont have an account? Register now!
                            </Link>
                        </div>
                    </div>

                    <div className='col-6 order-first'>
                        <p id='check-latest-peeps'>Check out the latest peeps:</p>
                        <div className='card border-warning mb-3' id='login-peeps'>
                            <AllPeeps peepData={peepData} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LoginPage;