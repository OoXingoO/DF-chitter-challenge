import { useState, useEffect } from 'react';

import AllPeeps from '../Peeps/AllPeeps';
import PostPeep from '../Peeps/PostPeep';

import { addPeepData, getPeepData } from '../../asyncFunctions/externalDataHandlers';

const HomePage = (user, setUser) => {

    const [peepData, setPeepData] = useState([]);
    const [errorStatus, setErrorStatus] = useState();

    const getDataHandler = () => {
        getPeepData(setPeepData, setErrorStatus);
    }

    useEffect(() => {
        getDataHandler();
    }, []);

    const addDataHandler = peep => {
        addPeepData(peep, getDataHandler, setErrorStatus, peepData.length + 1);
    }


    return (
        <div>
            <PostPeep peepHandler={addDataHandler} />
            <AllPeeps peepData={peepData} />
        </div>
    )
}

export default HomePage