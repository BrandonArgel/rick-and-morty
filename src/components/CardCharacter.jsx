import React from 'react'

export default function CardCharacter({ character }) {
    return (
        <div className="character__card">
            <div className="character__card--container">
                <div className="character__card--content">
                    <h2 className="character__card--name">{character.name}</h2>
                    <ul className="character__card--info">
                        <li><p><strong>Gender:</strong> <span>{character.gender}</span></p></li>
                        <li><p><strong>Status:</strong> <span className="character__card--info-status">{`${character.status} `} {character.status === "Alive" ? <b style={{ background: "rgba(0, 255, 0, 1)" }}></b> : character.status === "Dead" ? <b style={{ background: "rgba(255, 0, 0, 1)" }}></b> : <b style={{ background: "rgba(200, 200, 200, 1)" }}></b>}</span></p></li>
                        <li><p><strong>Specie:</strong> <span>{character.species}</span></p></li>
                        <li><p><strong>Origin:</strong> <span>{character.origin.name}</span></p></li>
                        <li><p><strong>Location:</strong> <span>{character.location.name}</span></p></li>
                    </ul>
                </div>
                <div className="character__card--img">
                    <h2 className="character__card--img-name">{character.name}</h2>
                    <img src={character.image} alt={character.name + " photo"} />
                </div>
            </div>
        </div>
    )
}
