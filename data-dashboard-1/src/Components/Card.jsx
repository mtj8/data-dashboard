const Card = ({ stat, description }) => {
    return (
        <div className="card">
            <h1>{stat}</h1>
            <p>{description}</p>
        </div>
    );
}

export default Card;