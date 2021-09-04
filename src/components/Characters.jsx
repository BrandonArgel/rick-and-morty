import React, { Fragment } from 'react'

import CardCharacter from './CardCharacter'

import "./styles/Characters.css"

export default function Characters({ characters, loading, results, end }) {
    console.log(characters)
    return (
        <Fragment>
            <div className="characters__container">
                <div className="characters">
                    {characters !== [] &&
                        characters.map(character => {
                            return (
                                <CardCharacter character={character}
                                />
                            )
                        })
                    }
                </div>
            </div>
            {loading &&
                <h3 className="message">Loading more characters...</h3>
            }
            {!results && !loading &&
                <h3 className="message">There's no matches</h3>
            }
            {end === true && results &&
                <h3 className="message">It seems that you have reached the end!</h3>
            }
        </Fragment>
    )
}

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