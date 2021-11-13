import React from 'react'
import searchElement from '../../assets/note_alt-24px.svg'

import './index.css'
function SearchDataNull() {
    return (
        <div id="noData">
            <p>Esta pesquisa ainda não possui dados de Resposta</p>
            <img src={searchElement} alt="Icone de pesquisa caderneta" />
        </div>
    )
}

export default SearchDataNull