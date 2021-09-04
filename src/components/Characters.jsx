import React, { Fragment } from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


import "./styles/Characters.css"

export default function Characters({ characters, loading, end }) {

    // fetch origin dimention from API
    // const [origin, setOrigin] = useState([]);

    // const fetchData = async character => {
    //     if (character.origin.url) {
    //         const response = await fetch(character.origin.url);
    //         const data = await response.json();
    //         setOrigin(prevData => [...prevData, data]);
    //     } else {
    //         setOrigin(prevData => [...prevData, character.origin.name]);
    //     }
    // }

    // useEffect(() => {
    //     characters.map(character => {
    //         fetchData(character);
    //     })
    // }, []);

    return (
        <Fragment>

            <div className="characters__container">
                <div className="characters">
                    {characters !== [] &&
                        characters.map(character => (
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
                        ))
                    }
                    {loading === true &&
                        <Fragment>
                            <SkeletonTheme color="rgba(0,0,0,0.8)" highlightColor="rgba(134, 255, 75, 0.8)" >
                                <Skeleton className="character__card" height={250} count={3} />
                            </SkeletonTheme>
                            <SkeletonTheme color="rgba(0,0,0,0.8)" highlightColor="rgba(134, 255, 75, 0.8)" >
                                <Skeleton className="character__card" height={250} count={3} />
                            </SkeletonTheme>
                            <SkeletonTheme color="rgba(0,0,0,0.8)" highlightColor="rgba(134, 255, 75, 0.8)" >
                                <Skeleton className="character__card" height={250} count={3} />
                            </SkeletonTheme>
                            <SkeletonTheme color="rgba(0,0,0,0.8)" highlightColor="rgba(134, 255, 75, 0.8)" >
                                <Skeleton className="character__card" height={250} count={3} />
                            </SkeletonTheme>
                            <SkeletonTheme color="rgba(0,0,0,0.8)" highlightColor="rgba(134, 255, 75, 0.8)" >
                                <Skeleton className="character__card" height={250} count={3} />
                            </SkeletonTheme>
                        </Fragment>
                    }

                </div>
            </div>
            {end === true &&
                <h3 className="end__message">It seems that you have reached the end of the characters!</h3>
            }
        </Fragment>
    )
}
