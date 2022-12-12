import axios from 'axios';
import { useState } from 'react';

const PostPeep = ({ user, getPeepData }) => {

    const [peepMessage, setPeepMessage] = useState(``);

    const handleChange = e => { setPeepMessage(e.target.value) };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let peep = {
            name: user.name,
            username: user.username,
            date: new Date().toISOString(),
            peepMessage: peepMessage
        };
        try {
            const res = await axios.post(`http://localhost:4000/peeps`, peep)
            getPeepData();
            setPeepMessage(``);
        } catch (error) {
            alert(`Oops! Something went wrong: ${error.message}`);
        }
    }

    return (
        <div className='card container' id='peep-form'>
            <p>Hello, {user.username}! What's on your mind?</p>
            <form onSubmit={handleSubmit}>
                <textarea type='text' name='peepMessage' placeholder='Enter here to peep...' value={peepMessage} onChange={handleChange} required /><br />
                <button type='submit' id='peep-button' value='submit' className='btn btn-warning' disabled={!peepMessage}>peep!</button>
            </form>
        </div >
    )
}

export default PostPeep;