import React, { useRef, useCallback } from 'react'

import CardCharacter from './CardCharacter'
import Loader from './Loader'

import "./styles/Characters.css"

export default function Characters({ characters, setPage, loading, end }) {
    const observer = useRef();
    const lastCharacterRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !end) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 0.8 });
        if (node) observer.current.observe(node);
    }, [loading, end]);

    return (
        <>
            {characters.length > 0 ? (
                <div className="characters__container">
                    <div className="characters">
                        {characters !== [] &&
                            characters.map((character, index) => {
                                if(characters.length === index + 1) {
                                    return <div ref={lastCharacterRef} key={character.id}><CardCharacter character={character} /></div>
                                } else {
                                    return <CardCharacter key={character.id} character={character} />
                                }
                            })
                        }
                    </div>
                </div>
            ) : !loading && (<h3 className="message">There are no matches</h3>)}
            {loading && <Loader />}
            {end === true && characters.length > 0 &&
                <h3 className="message">It seems that you have reached the end!</h3>
            }
            <p className="info">Scroll down to load more characters!</p>
        </>
    )
}
