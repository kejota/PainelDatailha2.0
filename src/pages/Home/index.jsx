import React, { Component } from 'react'

import imgDatailha from '../../img/img-datailha.png'

import "./index.css"
class NewSearch extends Component {
    render() {
        return (
            <div id="HomeContainer">
                <img id="imageDatailha" src={imgDatailha} alt="Imagem Home Datailha" />
            </div>
        )
    }
}

export default NewSearch