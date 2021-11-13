import React from 'react'

import './index.css'

function Report(props) {
    return (
        <div>
            <div>
                <p><b>DADOS PESSOAIS DO REQUERENTE</b></p>
                <p>NOME: {props.nomeDeclarante};</p>
                <div id="flex1">
                    <p>NACIONALIDADE: {props.nacionalidadeDeclarante};</p> <p>PROFISSÃO: {props.profissaoDeclarante};</p> <p>CPF: {props.cpfDeclarante};</p>
                </div>
                <p>RG: {props.rgDeclarante};</p>
                <p>FILHO(A) DE: {props.paisDeclarante};</p>
                <p>DATA DE NASCIMENTO: {props.nascimentoDeclarante};</p>
                <p>RESIDENTE E DOMICILIADO(A): {props.ruaEndereco};</p>
                <div id="flex2">
                    <p>Nº: {props.numeroEndereco};</p> <p>BAIRRO: {props.bairroEnderco};</p> <p>CIDADE: {props.cidadeEndereco};</p> <p>ESTADO: {props.estadoEndereco};</p>
                </div>
                <div id="flex3">
                    <p>CEP: {props.cepEndereco};</p> <p>TELEFONE: {props.telefoneDeclarante};</p> <p>CELULAR: {props.celularDeclarante};</p>
                </div>
                
                <p>ESTADO CIVIL: {props.estadoCivilDeclarante}</p>

                <p><b>SE CASADO, OU ESTEJA MANTENDO UNIÃO ESTÁVEL:</b></p>

                <p><b>DADOS DO (DA) CÔNJUGE OU COMPANHEIRO (A):</b></p><br />
                <p>NOME: {props.nomeConjugue};</p>
                <div id="flex4">
                    <p>NACIONALIDADE: {props.nacionalidadeConjuge};</p> <p>PROFISSÃO: {props.profissaoConjuge};</p> <p>CPF: {props.cpfConjuge};</p>
                </div>
                <div id="flex5">
                    <p>RG: {props.rgConjugue};</p> <p>ESTADO CIVIL: {props.estadoCivilConjugue};</p>
                </div>
                <p>FILHO(A) DE: {props.paisConjuge};</p>

                <p><b>DADOS DO CASAMENTO, SE HOUVER:</b></p><br />
                <p>REGIME DE BENS: {props.regimeDeBens};</p>
                <p>DATA DO CASAMENTO: {props.dataCasamento};</p>
                <p>MATRÍCULA DO CASAMENTO: {props.matriculaCasamento};</p>
                <p>CARTÓRIO ONDE FOI CELEBRADO O CASAMENTO: {props.cartorio};</p>

                <p><b>DADOS DO IMÓVEL:</b></p><br />
                <p>IPTU DO IMÓVEL: {props.iptu}</p>
                <p>NUMERO SEQUENCIAL: {props.numeroSequencial}</p>
                <div id="flex6">
                    <p>Nº CONFINANTE ESQUERDO: {props.numeroConfinanteEsquerdo};</p> <p>Nº CONFINANTE DIREITO: {props.numeroConfinanteDireito};</p>
                </div>
            </div>
        </div>
    )
}

export default Report