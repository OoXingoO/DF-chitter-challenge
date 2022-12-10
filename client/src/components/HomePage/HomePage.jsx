import { useState, useEffect } from 'react';
import axios from 'axios';

import AllPeeps from '../Peeps/AllPeeps';
import PostPeep from '../Peeps/PostPeep';

const HomePage = (user, setUser) => {

    const [peepData, setPeepData] = useState([]);
    const [getError, setGetError] = useState();
    const [postError, setPostError] = useState(``);

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

    return (
        <div>
            {/* <h1>Welcome, {user.username}!</h1> */}
            <PostPeep user={user} getPeepData={getPeepData} setPostError={setPostError} />
            <AllPeeps peepData={peepData} />
        </div>
    )
}

export default HomePage