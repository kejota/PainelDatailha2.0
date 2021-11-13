import React, { Component } from "react";
import moment from "moment";
import axios from "axios";

import { date } from "../../../script/data";

import ContainerReport from "../Components/ContainerReport";
import Signature from "../Components/Signature";
import FooterReport from "../Components/FooterReport";
import Report from "../Codem/Report";
import HeaderReport from "../Components/HeaderReport";
import "./global.css";

/*Para gerar a data e hora para numero único no relatorio */
var hour = moment().format("LTS").split(":");
var hourActualy = hour;

const data = new Date();

const spaceTop = {
  height: "57vh",
};

var dataCod = date().split("/");
class Codem extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      dateResponse: "",
      historicSearch: [],
      search: [],
      imgDocumentReport: [],
    };
  }

  paramId = () => {
    const {
      match: { params },
    } = this.props;
    return params.id;
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_HOST}/respostaPesquisa/${this.paramId()}`)
      .then((res) => {
        const historicSearch = res.data;
        this.setState({ historicSearch });

        var dataToday = date();
        const search = [];
        var count = 0;
        res.data.map((el, i) => {
          if (el.dateResponse == dataToday) {
            search[count] = el;
            count++;
          }
        });
        this.setState({ search });

        var imgDocumentReport = [];
        var index = 0;
        this.state.search.map((e) => {
          for (var i = 50; i <= 62; i++) {
            if (e.questions[i].query.response.res != "") {
              imgDocumentReport[index] = e.questions[i].query;
              index++;
            }
          }
        });

        this.setState({ imgDocumentReport });
        console.log(imgDocumentReport);

        if (this.state.search.length <= 0) {
          return;
        }

        const title = this.state.search[0].title;

        this.setState({ title });

        const dateResponse = this.state.search[0].dateResponse;
        this.setState({ dateResponse });
      });
  }

  insertDoc = () => {
    var doc =
      dataCod[0] + dataCod[1] + dataCod[2] + hourActualy[0] + hourActualy[1];

    return doc;
  };

  getDateSearch = (e) => {
    var dateInvert = e.target.value.split("-");
    var date = dateInvert[2] + "/" + dateInvert[1] + "/" + dateInvert[0];

    const search = [];
    var count = 0;
    this.state.historicSearch.map((el, i) => {
      if (el.dateResponse == date) {
        search[count] = el;
        count++;
      }
    });
    this.setState({ search });
  };

  renderReportPage = () => {
    return this.state.search.map((e, i) => (
      <>
        <HeaderReport
          title={this.state.title}
          numberDoc={this.insertDoc() + "-" + i}
        />
        <ContainerReport
          titleContainer=""
          city="Belém"
          Uf="PA"
          date={e.dateResponse}
        >
          <Report
            nomeDeclarante={
              this.state.search[i].questions[1].query.response.res
            }
            nacionalidadeDeclarante={
              this.state.search[i].questions[3].query.response.res
            }
            profissaoDeclarante={
              this.state.search[i].questions[10].query.response.res
            }
            cpfDeclarante={this.state.search[i].questions[2].query.response.res}
            rgDeclarante={this.state.search[i].questions[5].query.response.res}
            paisDeclarante={
              this.state.search[i].questions[7].query.response.res +
              " E " +
              this.state.search[i].questions[8].query.response.res
            }
            nascimentoDeclarante={
              this.state.search[i].questions[4].query.response.res
            }
            ruaEndereco={this.state.search[i].questions[29].query.response.res}
            numeroEndereco={
              this.state.search[i].questions[30].query.response.res
            }
            bairroEnderco={
              this.state.search[i].questions[31].query.response.res
            }
            cidadeEndereco={
              this.state.search[i].questions[32].query.response.res
            }
            estadoEndereco="PARÁ"
            cepEndereco={this.state.search[i].questions[28].query.response.res}
            telefoneDeclarante={
              this.state.search[i].questions[33].query.response.res
            }
            celularDeclarante={
              this.state.search[i].questions[34].query.response.res
            }
            estadoCivilDeclarante={
              this.state.search[i].questions[35].query.response.res
            }
            nomeConjugue={this.state.search[i].questions[41].query.response.res}
            nacionalidadeConjuge={
              this.state.search[i].questions[43].query.response.res
            }
            profissaoConjuge={
              this.state.search[i].questions[47].query.response.res
            }
            cpfConjuge={this.state.search[i].questions[42].query.response.res}
            rgConjugue={this.state.search[i].questions[45].query.response.res}
            estadoCivilConjugue={
              this.state.search[i].questions[35].query.response.res
            }
            paisConjuge={
              this.state.search[i].questions[48].query.response.res +
              " E " +
              this.state.search[i].questions[49].query.response.res
            }
            regimeDeBens={this.state.search[i].questions[37].query.response.res}
            dataCasamento={
              this.state.search[i].questions[38].query.response.res
            }
            matriculaCasamento={
              this.state.search[i].questions[39].query.response.res
            }
            cartorio={this.state.search[i].questions[40].query.response.res}
            iptu={this.state.search[i].questions[24].query.response.res}
            numeroSequencial={
              this.state.search[i].questions[25].query.response.res
            }
            numeroConfinanteEsquerdo={
              this.state.search[i].questions[27].query.response.res
            }
            numeroConfinanteDireito={
              this.state.search[i].questions[26].query.response.res
            }
          />

          <Signature
            signatureImg={this.state.search[i].questions[63].query.response.res}
          />
        </ContainerReport>

        <div style={spaceTop}></div>

        <FooterReport
          dataFooter="CODEM – Av. Nazaré, nº 708- CEP: 66035-135 – Bairro: Nazaré."
          dataComplement="CNPJ: 04977583/0001-66. Belém-Pa. Telefone: 3084-0735/Fax: 3084-0700."
          cont={i + 1}
          total={this.state.search.length}
          cpf={this.state.search[i].questions[2].query.response.res}
        />

        <div id="titleDocumentPhotoDeclaration">
          <p>IMAGENS DE FOTOS DOS DOCUMENTOS DAS DECLARAÇÕES</p>
        </div>
        <div id="containerImgDocument">
          {this.state.imgDocumentReport.map((element, index) => (
            <div id="contentDocument">
              <p>{element.title}</p>
              <p>
                <img src={element.response.res} alt="Imagem Documento" />
              </p>
            </div>
          ))}
        </div>
      </>
    ));
  };

  render() {
    return (
      <div id="pageContainer">
        <div id="reportContainer">
          <div id="dateFilter">
            Periodo:{" "}
            <input
              id="dateInput"
              type="date"
              name="dateSearch"
              onChange={(e) => this.getDateSearch(e)}
            />
          </div>
          <div id="centralContainer">{this.renderReportPage()}</div>
        </div>
      </div>
    );
  }
}

export default Codem;
