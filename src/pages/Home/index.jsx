import React, { Component } from 'react'

import imgDatailha from '../../img/img-datailha.png'

import { Link } from 'react-router-dom'

import "./index.css"
class NewSearch extends Component {
    render() {
        return (
            <div id="HomeContainer">
               <Link  to={`/painel`} > <img id="imageDatailha" src={imgDatailha} alt="Imagem Home Datailha" /></Link>
            </div>
        )
    }
}

export default NewSearch