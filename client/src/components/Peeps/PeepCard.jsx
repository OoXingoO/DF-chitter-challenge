const PeepCard = ({ peep }) => {

    const { name, username, date, peepMessage } = peep

    const displayDate = new Date(date).toLocaleDateString();
    const displayTime = new Date(date).toLocaleTimeString();

    return (
        <div className="card container" id="peep-card">
            <div className="card-header">
                <p>{name}&nbsp;@{username}</p>
            </div>
            <div className="card-body">
                <p className="card-text">{peepMessage}</p>
            </div>
            <div className="card-footer text-muted">
                <p>{displayDate}·{displayTime}</p>
            </div>
        </div>
    )
}

export default PeepCard