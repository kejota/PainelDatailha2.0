import React from 'react'

import "./index.css"
function PhotoReport(props) {
    return (
        <div id="photoReport">
            <p id="question">{props.titleQuestion}</p>
            <p id="photo"><img src={props.img} alt="Foto Capturada" /></p>
        </div>
    )
}

export default PhotoReport