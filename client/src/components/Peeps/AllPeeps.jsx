import PeepCard from "./PeepCard";

const AllPeeps = ({ peepData }) => {

    peepData = [...peepData].reverse();    //To reverse into chronological order

    const peepListItems = peepData.map(peep => <PeepCard peep={peep} key={peep._id} />);


    return (
        <div>
            {peepListItems}
        </div>
    )
}

export default AllPeeps