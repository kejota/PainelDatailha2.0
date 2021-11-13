import React from "react"
import { Link } from 'react-router-dom'
import './index.css'
import '../../styles/global.css'

import addElement from '../../assets/add_circle-24px.svg'
import searchOffElement from '../../assets/search_off.svg'
import personResearch from '../../assets/personReasearch.svg'
import adminIcon  from '../../assets/manage_accounts.svg'

import painelElement from '../../assets/summarize-24px.svg'
import timeElement from '../../assets/time.svg'


function SideNav() {
    return (
        <div id="menu_painel">
            <div id="menuElements">
                <div id="element">
                    <Link to="/painel"><img src={painelElement} alt="elemento gráfico" />     Painel de Controle</Link>
                </div>
                <div id="element">
                    <Link to="/novaPesquisa"><img src={addElement} alt="elemento adicionar" />     Nova Pesquisa</Link>
                </div>
                <div id="element">
                    <Link to="/aguardandoLiberacao"><img src={timeElement} alt="elemento relogio" />     Em liberação</Link>
                </div>
                <div id="element">
                    <Link to="/pesquisasEncerradas"><img src={searchOffElement} alt="elemento adicionar" />     Encerradas</Link>
                </div>
                <div id="element">
                    <Link to="/pesquisadores"><img src={personResearch} alt="elemento pessoa" />     Pesquisadores</Link>
                </div>
                <div id="element">
                    <Link to="/admin"><img src={adminIcon} alt="elemento pessoa admin" />     Acesso Administrativo</Link>
                </div>
            </div>

        </div>
    )
}

export default SideNav