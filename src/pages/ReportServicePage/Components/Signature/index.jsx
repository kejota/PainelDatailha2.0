import React from 'react'

import "./index.css"
function Siganature(props) {
    return (
        <div id="signature">
            <br />
            <br />
            <img id="imageSignature" src={props.signatureImg} alt="Assinatura" />
            <p id="localSignature">___________________________________________________</p>
            <p id="name">ASSINATURA DO DECLARANTE</p>
        </div>
    )
}

export default Siganature