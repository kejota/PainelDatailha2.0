import React from "react";
import brasao from '../../assets/Brasao_UFPA.jpg'
import paru from '../../assets/paru.jpeg'
import './index.css'
const Header = () => {
    return (
        <div className="conteiner">
            <img className="imagem-report" src={brasao} alt="" />
            <div className="conteiner-title">
                <p className="title-report">
                    UNIVERSIDADE FEDERAL DO PARÁ
                </p>
                <p className="title-report">
                    INSTITUTO DE CIÊNCIAS SOCIAIS APLICADAS
                </p>
                <p className="title-report">
                    PROGRAMA DE APOIO À REFORMA URBANA - PARU
                </p>
                <p className="title-report">
                    PROJETO DE REGULARIZAÇÃO FUNDIÁRIA DE INTERESSE SOCIAL
                </p>
                <p className="title-report">
                    – REURB -S
                </p>
            </div>
            <img className="imagem-report" src={paru} alt="" />
        </div>
    )
}

export default Header