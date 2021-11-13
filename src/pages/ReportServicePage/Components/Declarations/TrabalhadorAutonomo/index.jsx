import React from 'react'

import "../../declarations.css"
function TrabalhadorAutonomo(props) {
    return (
        <div id="ContainerDeclaration">
            <h1 id="titleDeclaration">DECLARAÇÃO DE TRABALHADOR(A) AUTÔNOMO(A)</h1>


            <div id="contentDeclaration">
                <div className="declaration">
                    Eu, <b>{props.nome}</b>, CPF nº <b>{props.cpf} </b>
                    residente e domiciliado na rua <b>{props.rua}</b>, nº <b>{props.numero}</b>, bairro <b>{props.bairro}</b>,
                    na cidade de <b>Belém</b>, estado do Pará, declaro que
                    estou desenvolvendo atividade trabalhador (a) autônomo (a), com uma renda
                    mensal média de R$ <b>{props.rendaMensal}</b>. Ratifico serem verdadeiras as informações acima
                    prestadas.
                </div>

                <div id="dateAutomomo">
                    Data: {props.data}
                </div>

                <div id="assinature">
                    <img id="imageSignature" src={props.signatureImg} alt="Assinatura" />
                    <p id="sig">___________________________________________________________________</p>
                    <p id="ass">Assinatura do declarante</p>
                </div>

                <div id="witness">
                    <p>Testemunha 1: _________________________________________________</p>
                    <p>CPF: </p>
                </div>
                <div id="witness">
                    <p>Testemunha 2: _________________________________________________</p>
                    <p>CPF: </p>
                </div>
            </div>

        </div>
    )
}

export default TrabalhadorAutonomo