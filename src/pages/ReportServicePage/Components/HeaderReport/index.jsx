import React from 'react'

import terraDaGenteLogo from '../../../../img/reportComponent/Terra-da-gente-logo.JPG'
import codemLogo from '../../../../img/reportComponent/Codem-Logo.JPG'
import prefeituraDeBelemLogo from '../../../../img/reportComponent/prefeitura-de-belem.JPG'
import governoDoParaLogo from '../../../../img/reportComponent/governoDoPara.JPG'

import "./index.css"
function HeaderReport(props) {
    return (
        <div id="headerReport">
            <div id="boxHeader">
                <div id="imagesHeader">
                    <div id="leftbox">
                        <div id="containerBackground">
                            <div id="logoContainer">
                                <img src={terraDaGenteLogo} alt="logo cabeçalho" />
                                <img src={codemLogo} alt="logo cabeçalho" />
                                <img src={prefeituraDeBelemLogo} alt="logo cabeçalho" />
                                <img src={governoDoParaLogo} alt="logo cabeçalho" />
                            </div>
                        </div>
                        <div id="titleDoc">
                            <h1>{props.title}</h1>
                            <p id="doc">DOC: {props.numberDoc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderReport