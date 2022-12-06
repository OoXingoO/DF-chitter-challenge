import { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setUser: setLoginUser }) => {

    const [user, setUser] = useState({
        username: ``,
        password: ``
    });

    // const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:4000/login`, user);
        alert(res.data.message);
        setLoginUser(res.data.user);
        setUser({ username: ``, password: `` });
        // setLoggedIn(res.data.user ? true : false);
    }

    return (
        <>
            {/* {loggedIn && <Navigate to="/" />} */}
            <div className='card mb-4 rounded-3'>
                <h3>Log in Chitter:</h3>
                <form onSubmit={login}>
                    <input type="text" id="sign-in-username" name="username" value={user.username} onChange={handleChange} placeholder="Enter username..." />
                    <br />
                    <input type="password" id="sign-in-password" name="password" value={user.password} onChange={handleChange} placeholder="Enter password..." />
                    <br />
                    <button type="submit" value="Login" className='btn btn-warning' >Login</button>
                </form>
            </div>
            {/* <Link to="/register">
                Dont have an account? Register now!
            </Link> */}
        </>
    )
}

export default LoginPage;