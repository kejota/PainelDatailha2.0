import React from "react";

import "../../declarations.css";

function UniaoEstavel(props) {
  return (
    <div id="ContainerDeclaration">
      <h1 id="titleDeclaration">DECLARAÇÃO DE UNIÃO ESTÁVEL</h1>

      <h2 id="declarant">1º DECLARANTE</h2>
      <div className="declaration">
        <b>{props.nomeDeclarante1}</b>, brasileiro (a),{" "}
        <b>{props.profissaoDeclarante1}</b>, portador (a) da C.I nº{" "}
        <b>{props.rgDeclarante1} </b>e CPF n.º <b>{props.cpfDeclarante1}</b>;
      </div>

      <h2 id="declarant">2º DECLARANTE</h2>
      <div className="declaration">
        <b>{props.nomeDeclarante2}</b>, brasileiro (a),{" "}
        <b>{props.profissaoDeclarante2}</b>, portador (a) do RG nº{" "}
        <b>{props.rgDeclarante2}</b> e CPF n.º <b>{props.cpfDeclarante2}</b>,
        ambos residentes e domiciliados no (a) <b>{props.endereco}</b>, nº{" "}
        <b>{props.numero}</b>, bairro: <b>{props.bairro}</b>, nesta cidade.{" "}
        <br />
        <b>DECLARAMOS</b> para os devidos fins de direito e sob as penas da lei,
        que convivemos em <b>UNIÃO ESTÁVEL</b>, de natureza familiar, pública e
        duradoura há pelo menos <b>{props.anosDeUniaoEstavel}</b> anos e que a
        identidade de nosso endereço decorre desse fato, nos termos do art. 1723
        do Código Civil.
      </div>

      <div id="dateUnionStable">Belém (PA), {props.data}</div>

      <div id="containerSignature">
        <div id="assinature" className="signature1">
          <img id="imageSignature" src={props.signatureImg1} alt="Assinatura" />
          <p id="sig">
          _________________________________________________
          </p>
          <p id="ass">Assinatura</p>
        </div>

        <div id="assinature">
          <img id="imageSignature" src={props.signatureImg2} alt="Assinatura" />
          <p id="sig">
          _________________________________________________
          </p>
          <p id="ass">Assinatura</p>
        </div>
      </div>

      <div id="containerWitness">
        <div id="testemunha1">
          _________________________________________________
          <p>Testemunha</p>
          <p>RG:</p>
        </div>
        <div>
          _________________________________________________
          <p>Testemunha</p>
          <p>RG:</p>
        </div>
      </div>
    </div>
  );
}

export default UniaoEstavel;
