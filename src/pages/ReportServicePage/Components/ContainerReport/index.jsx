import React from 'react'

import "./index.css"
function DataReport(props) {
    return (
        <main>
            <div id="containerData">
                <p>{props.titleContainer}</p>
                {props.children}
            </div>
            <div id="registerReport">
                <p>{props.city}/{props.Uf}, { props.date}</p>
            </div>
        </main>
    )
}

export default DataReport