import React from "react"
import './index.css'
import '../../styles/global.css'

import searchElement from '../../assets/note_alt-24px.svg'
import nextElement from '../../assets/navigate_next-24px.svg'


function SearchComponentElement(props) {
  return(
      <div id="elementSearch">
          <img id="icon" src={searchElement} alt="ícone de pesquisa"/>
          <div><a id="link" href="#">{props.titleSearch} | {props.description}</a></div>
          <p id="date">Data de criação: {props.dataOfCriation}</p>
          <img id="iconNext" src={nextElement} alt="ícone próximo"/>
      </div>
  )
}

export default SearchComponentElement