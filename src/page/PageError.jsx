import React from 'react'

import ErrorPage from "../assets/svg/error_page.svg"

import "./styles/PageError.css"

export default function PageError({ error }) {
    return (
        <div className="page-error__container">
            <h2>Error: {error}</h2>
            <img src={ErrorPage} alt="Error" />
        </div>
    )
}
