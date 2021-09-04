import React from 'react'

export default function CardCharacter({ character }) {
    return (
        <div className="character__card" key={character.id}>
            <div className="character__card--container">
                <h2 className="character__card--name">{character.name}</h2>
                <ul className="character__card--info">
                    <li><p><strong>Gender:</strong> {character.gender}</p></li>
                    <li><p className="character__card--info-status"><strong>Status:</strong> {`${character.status} `} {character.status === "Alive" ? <span style={{ background: "rgba(0, 255, 0, 1)" }}></span> : character.status === "Dead" ? <span style={{ background: "rgba(255, 0, 0, 1)" }}></span> : <span style={{ background: "rgba(200, 200, 200, 1)" }}></span>}</p></li>
                    <li><p><strong>Specie:</strong> {character.species}</p></li>
                    <li><p><strong>Origin:</strong> {character.origin.name}</p></li>
                    <li><p><strong>Location:</strong> {character.location.name}</p></li>
                </ul>
            </div>
            <img className="character__card--img" src={character.image} alt={character.name + " photo"} />
        </div>
    )
}
