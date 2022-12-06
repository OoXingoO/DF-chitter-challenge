import { useState } from 'react';

const PostPeep = ({ peepHandler }) => {

    const [peepMessage, setPeepMessage] = useState(``);

    const handleChange = e => { setPeepMessage(e.target.value) };

    const handleSubmit = e => {
        e.preventDefault();
        const peep = {
            peepMessage: peepMessage,
            date: new Date().toISOString()
        }
        setPeepMessage(``);
        peepHandler(peep);
    }

    return (
        <div className='card container'>
            <form onSubmit={handleSubmit}>
                <textarea type='text' name='peepMessage' placeholder='Enter here to peep...' value={peepMessage} onChange={handleChange} required /><br />
                <button type='submit' value='submit' className='btn btn-warning' disabled={!peepMessage}>peep!</button>
            </form>
        </div >
    )
}

export default PostPeep