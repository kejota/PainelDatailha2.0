import React from "react";

import "../../declarations.css";
function Posse(props) {
  return (
    <div id="ContainerDeclaration">
      <h1 id="titleDeclaration">DECLARAÇÃO DE POSSE</h1>

      <div id="contentDeclaration">
        <div className="declaration">
          Eu <b>{props.nomeDeclarante}</b> brasileiro(a),{" "}
          <b>{props.estadoCivil}</b>, <b>{props.profissao}</b>, Portador(a) do
          RG n.º
          <b>{props.rg}</b> e do CPF n.º <b>{props.cpf}</b>, declaro para os
          devidos fins que resido e mantenho a posse de boa fé, de forma mansa e
          pacífica, sem qualquer contestação extrajudicial ou judicial até a
          presente data, do imóvel situado no (a) <b>{props.endereco}</b>, nº{" "}
          <b>{props.numero}</b>, bairro: <b>{props.bairro}</b> na cidade de
          Belém, posse esta, adquirida há <b>{props.anosDePosse}</b> anos.
        </div>

        <div id="dateContainer">Data: {props.data}</div>

        <div id="assinature">
          <img id="imageSignature" src={props.signatureImg} alt="Assinatura" />
          <p id="sig">
            ___________________________________________________________________
          </p>
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
  );
}

export default Posse;
