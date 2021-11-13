import React from 'react'
import { Form } from 'react-bootstrap'
import "./index.css"

function HeaderSearch(props) {
    return (
        <div className="headerSearch container-md justify-content-center">
            <div></div>
            <div id="central">
                <h2 className="h2 text-center titleSearch">{props.titleSearch}</h2>
                <p className="text-center adjusteText">{props.DescriptionSearch}</p>
            </div>
            <div></div>
        </div>
    )
}

export default HeaderSearch