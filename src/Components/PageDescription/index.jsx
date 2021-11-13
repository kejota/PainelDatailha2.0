import React from "react"

import "./index.css"

function PageDescription(props) {
    return (
        <div id="linePageTitle">
            <p> <img src={props.icon} alt={props.descriptionIcon}/> {props.title}</p>
        </div>
    );
}

export default PageDescription