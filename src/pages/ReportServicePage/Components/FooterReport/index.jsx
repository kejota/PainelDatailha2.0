import React from 'react'

import "./index.css"
function FooterReport(props) {
    return (
        <footer>
            <p id="dataFooter">{props.dataFooter}</p>
            <p id="dataFooter">{props.dataComplement}</p>
            <p id="docData">DOCUMENTO {props.cont} DE {props.total} - CPF: {props.cpf}</p>
        </footer>
    )
}

export default FooterReport