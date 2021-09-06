import React, { Fragment } from 'react'

import CardCharacter from './CardCharacter'
import Loader from './Loader'

import "./styles/Characters.css"

export default function Characters({ characters, loading, results, end }) {
    return (
        <Fragment>
            <div className="characters__container">
                <div className="characters">
                    {characters !== [] &&
                        characters.map(character => {
                            return (
                                <CardCharacter character={character} key={character.id} />
                            )
                        })
                    }
                </div>
            </div>
            {loading &&
                <Loader />
            }
            {!results && !loading &&
                <h3 className="message">There are no matches</h3>
            }
            {end === true && results &&
                <h3 className="message">It seems that you have reached the end!</h3>
            }
            <p className="info">Scroll down to load more characters!</p>
        </Fragment>
    )
}
