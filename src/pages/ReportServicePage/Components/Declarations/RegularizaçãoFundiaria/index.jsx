import React from 'react'

function RegularizacaoFundiaria(props) {
    return (
        <div id="ContainerDeclaration">
            <h1 id="titleDeclaration">REQUERIMENTO PARA REGULARIZAÇÃO FUNDIÁRIA URBANA</h1>


            <div id="contentDeclaration">
                <div className="declaration">
                    <b>{props.nomeCompleto}</b>, <b>{props.nacionalidade}</b>, <b>{props.estadoCivil}</b>, <b>{props.profissaoOcupacao}</b>,
                    Portador (a) do RG nº <b>{props.rg}</b>, e do CPF nº <b>{props.cpf}</b>, e
                     <b> {props.nomeCompletoConjuge}</b>, <b>{props.nacionalidadeConjuge}</b>, <b>{props.estadoCivilConjuge}</b>, <b>{props.profissaoOcupacaoConjuge}</b>,
                    Portador (a) do RG nº <b>{props.rgConjuge}</b>, e do CPF nº <b>{props.cpfConjuge}</b>, residentes e domiciliados na
                    <b> {props.endereco}</b>, nº <b>{props.numero}</b>, Bairro: <b>{props.bairro}</b>, Sequencial nº <b>{props.numeroSequencial}</b>,
                    Confinante Direito nº <b>{props.confinateDireitoNumero}</b>, Confinante Esquerdo nº <b>{props.confinateEsquerdoNumero}</b>,
                    Cidade de Belém, Estado do Pará, solicitam à Companhia de Desenvolvimento e Administração da
                    Área Metropolitana de Belém - CODEM, com base no art. 183, §1º da CF/88, Lei Federal 13.465/2017,
                    que se digne através do instrumento cabível regularizar o imóvel localizado no endereço acima.
                    Ademais, declaram e informam para todos os fins de direito, sob as penas da Lei <b>{props.confirmacao} </b>
                    serem proprietários ou concessionários de outro imóvel urbano, ou rural, nem beneficiários de
                    outro programa de Regularização Fundiária. Outrossim, declaram que o tempo que adquiriram a posse do imóvel foi de <b>{props.anosDePosse}</b> anos, 
                    o qual possui a condição de ocupação: <b>{props.tipoOcupacao}</b>,
                    para o tipo de uso: <b>{props.tipoDeUso}</b> com predominância <b>{props.tipoUsoPredominante}</b>. Por fim, declaram que sua renda familiar mensal, estima-se R$
                    <b> {props.rendaMensal}</b>, estando cientes de que a omissão de informações, ou apresentação de dados ou documentos falsos e/ou
                    divergentes, resultam em penalidades legais. <br />
                     Nestes Termos, <br />
                     Requerem e Declaram Expressamente.
                </div>

                <div id="dateContainer">
                    Belém/PA, {props.data}
                </div>

                <div id="assinature">
                    <img id="imageSignature" src={props.signatureImg1} alt="Assinatura" />
                    <p id="sig">___________________________________________________________________</p>
                    <p id="ass">Assinatura</p>
                </div>

                <div id="assinature">
                    <img id="imageSignature" src={props.signatureImg2} alt="Assinatura" />
                    <p id="sig">___________________________________________________________________</p>
                    <p id="ass">Assinatura</p>
                </div>

                <div id="contactPhone">
                    <p>Telefones para contato: {props.phoneContact}</p>
                </div>
            </div>

        </div>
    )
}

export default RegularizacaoFundiaria