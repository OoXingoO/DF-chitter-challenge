import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [user, setUser] = useState({
        name: ``,
        username: ``,
        email: ``,
        password: ``
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const register = async (e) => {
        e.preventDefault();
        const { name, username, email, password } = user;
        if (name && username && email && password) {
            const res = await axios.post(`http://localhost:4000/register`, user);
            alert(res.data.message);
            setUser({
                name: ``,
                username: ``,
                email: ``,
                password: ``
            });
            return;
        }
        alert(`Invalid input`);
    }

    return (
        <div className='card container' id='register-card'>
            <h3>Create new account</h3>
            <p>
                Already have an account?&nbsp;<Link to="/login">Sign In</Link>
            </p>
            <form onSubmit={register}>
                <input type="text" id="register-name" name="name" value={user.name} onChange={handleChange} placeholder="Enter name..." />
                <br />
                <input type="text" id="register-username" name="username" value={user.username} onChange={handleChange} placeholder="Enter username..." />
                <br />
                <input type="email" id="register-email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email..." />
                <br />
                <input type="password" id="register-password" name="password" value={user.password} onChange={handleChange} placeholder="Enter password..." />
                <br />
                <button type="submit" className='btn btn-warning'>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register