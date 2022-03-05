import React from 'react'

import SearchIcon from "../assets/svg/search.svg"

import "./styles/Search.css"

export default function Search({ value, setQuery }) {
    return (
        <section className="search__container">
            <div className="search__bar">
                <input
                    autoComplete="off"
                    id="search"
                    type="text"
                    className="search__input"
                    placeholder="Search characters..."
                    value={value}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <label htmlFor="search"><img src={SearchIcon} alt="Search Icon" /></label>
            </div>
        </section>
    )
}
