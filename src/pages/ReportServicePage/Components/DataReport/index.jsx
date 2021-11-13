import React from 'react'

import "./index.css"
function DataReport(props) {
    return (
        <div id="dataReport">
            <p id="question">{props.titleQuestion}</p>
            <p id="response">{props.response}</p>
        </div>
    )
}

export default DataReport