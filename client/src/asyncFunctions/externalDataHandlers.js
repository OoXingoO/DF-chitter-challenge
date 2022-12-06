import axios from "axios";

export const addPeepData = async (peep, getDataHandler, setErrorStatus) => {

    try {
        const response = await axios.post(`http://localhost:4000/peeps`, peep);
        if (response.status === 201) {
            getDataHandler();
        }
    } catch (error) {
        setErrorStatus(error.message)
        console.log(error.message)
    }
}

export const getPeepData = async (setPeepData, setErrorStatus) => {
    try {
        const response = await axios.get(`http://localhost:4000/peeps`);
        setPeepData(response.data);
    } catch (error) {
        setErrorStatus(error.message)
        console.log(error.message)
    }
}