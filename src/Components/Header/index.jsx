import React from "react"
import { Link } from 'react-router-dom'
import './index.css'
import '../../styles/global.css'

import homeElement from '../../assets/home.svg'
import logOutElement from '../../assets/logout-24px.svg'
import logo from '../../img/DatailhaLogo1.png'
import userCont from '../../assets/account_circle.svg'

function Header() {
  function logOut() {
    localStorage.clear()
  }
  return (<header>
    <div id="logo">
      <div></div>
      <img id="logoImg" src={logo} alt="logo Datailha" />
    </div>
    <span id="acount">
      <p><img src={userCont} alt="Icone de Conta de usuário" />{localStorage.getItem('user')}: {localStorage.getItem('role')}</p>
    </span>
    <div id="actionsHeader">
      <Link to={`/painel`}>
        <img src={homeElement} alt="icone de casa" />
      </Link>

      <Link to={`/acesso`}>
        <img src={logOutElement} onClick={() => logOut()} alt="icone de sair da página" />
      </Link>
    </div>
  </header>)
}

export default Header
