import React, { Component } from "react";
import { CSVLink } from "react-csv";
import ReactToExcel from "react-html-table-to-excel";
import axios from "axios";

import Header from "../../Components/Header";
import SearchDescription from "../../Components/searchDescription";
import SearchDataNull from "../../Components/SerchDataNull";
import Loading from "../../Components/Loading";

import painelElement from "../../assets/summarize-24px.svg";
import graphElement from "../../assets/insights-24px.svg";
import searchIcon from "../../assets/search.svg";
import "./index.css";

const headerTable = {
  "background-color": "#476ab0",
};

const inputHeaderTable = {
  "background-color": "#476ab0",
  "margin": "0",
  border: "none",
  "font-size": "0.8vw",
  "font-weight": "600",
  color: "#ffffff",
};

const inputHeaderTableexport = {
  "background-color": "#fff",
  "margin": "0",
  border: "none",
  "font-size": "0.8vw",
  "font-weight": "600",
  color: "#000",
};

const lineTable = {
  "font-size": "0.8vw",
  cursor: "pointer",
};

const limit = 50;
var start = 0;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      load: "Inprogress",
      searchTerm: "",
      searchResults: [],
      searchXLSexportData:[],
      header: [],
      search: [],
      questions: [],
      headerTable: [],
      dataTable: [],
      totalData: "",
    };
  }
  paramId = () => {
    const {
      match: { params },
    } = this.props;
    return params.id;
  };

  componentDidMount() {
    //Requisição por demanda a cada 50 resultados para listagem dos dados
    axios
      .get(
        `${
          process.env.REACT_APP_HOST
        }/respostaPesquisaInterval/${this.paramId()}/${limit}/${start}`
      )
      .then((res) => {
        if (res.data === "") {
          const load = "NoLoadingData";
          this.setState({ load });
        } else {
          const load = "sucess";
          this.setState({ load });
        }

        res.data.forEach((element) => {
          const header = element;
          this.setState({ header });
        });

        const searchResults = res.data;
        this.setState({ searchResults: searchResults });

        if (res.data[0] != undefined) {
          const questions = res.data[0].questions;
          this.setState({ questions });
        }
      });

    //requisição para carregamento dos dados para o CSV e XLS
    axios
      .get(`${process.env.REACT_APP_HOST}/respostaPesquisa/${this.paramId()}`)
      .then((res) => {
        var totalData = res.data.length;
        this.setState({ totalData });

        const headerTable = this.state.questions.map((element) => {
          return element.query.title;
        });

        headerTable.push("PESQUISADOR");
        headerTable.push("DATA");
        this.setState({ headerTable });

        const search = res.data;
        this.setState({ search });

        const searchXLSexportData = res.data;
        this.setState({ searchXLSexportData: searchXLSexportData });

        const dataTable = this.state.search.map((element) => {
          return element.questions.map((el, i) => {
            return el.query.response.res;
          });
        });

        for (var i = 0; i < dataTable.length; i++) {
          dataTable[i].push(this.state.search[i].thisResearcherResponse);
          dataTable[i].push(this.state.search[i].dateResponse);
        }
        this.setState({ dataTable });
      });
  }

  filterResearch = (e) => {
    const searchTerm = e.target.value;
    const search = this.state.search;
    this.setState({ searchTerm });

    const results = this.state.search.filter(function (e) {
      return e.thisResearcherResponse[0].includes(searchTerm);
    });
    if (searchTerm != "") {
      this.setState({ searchResults: results });
    } else {
      this.setState({ searchResults: search });
    }
  };

  renderInputElementDataTable = (e, i) => {
    var result = e.query.response.res;
    var responseResult = "";
    result.map((el, i) => {
      responseResult += el + "; ";
    });
    return (
      <td>
        <input
          style={lineTable}
          id="tdInput"
          type="text"
          value={responseResult}
        />{" "}
        <span hidden>{e.query.response.res + ","}</span>
      </td>
    );
  };

  addNextInterval = (e) => {
    if (e.target.innerText > 1) {
      start = 0;
      start = (e.target.innerText - 1) * 50;
    } else if (e.target.innerText == 1) {
      start = 0;
    }
    axios
      .get(
        `${
          process.env.REACT_APP_HOST
        }/respostaPesquisaInterval/${this.paramId()}/${limit}/${start}`
      )
      .then((res) => {
        res.data.forEach((element) => {
          const header = element;
          this.setState({ header });
        });

        const searchResults = res.data;
        this.setState({ searchResults: searchResults });

        if (res.data[0] != undefined) {
          const questions = res.data[0].questions;
          this.setState({ questions });
        }
      });
  };

  renderPaginate = () => {
    var paginates = this.state.totalData / 50;
    var numberPaginates = [];
    for (var i = 0; i < paginates; i++) {
      numberPaginates[i] = i + 1;
    }
    return numberPaginates.map((e, i) => (
      <div id="paginate">
        <a id="linkPaginate" href="#" onClick={(e) => this.addNextInterval(e)}>
          {i + 1}
        </a>
      </div>
    ));
  };

  table_to_xls = () => {
    return (
      <>
        <tr>
          <>
            {this.state.questions.map((e, i) => (
              <td style={inputHeaderTableexport}>
                {" "}
                {i + 1}.{" "}
                <input
                  style={inputHeaderTableexport}
                  type="text"
                  value={e.query.title}
                />{" "}
                <p hidden>{e.query.title}</p>
              </td>
            ))}
            <td style={inputHeaderTableexport}>Pesquisador</td>

            <td style={inputHeaderTableexport}>Data</td>
          </>
        </tr>

        {this.state.searchXLSexportData.map((element, index) => (
          <>
            <tr>
              {element.questions.map((e, i) => (
                <>{this.renderInputElementDataTable(e, i)}</>
              ))}
              <td id="researchName" style={lineTable}>
                <input
                  id="tdInput"
                  style={lineTable}
                  type="text"
                  value={element.thisResearcherResponse}
                />
                <span hidden>{element.thisResearcherResponse}</span>
              </td>

              <td id="dateResponse" style={lineTable}>
                {element.dateResponse}
              </td>
            </tr>
          </>
        ))}
      </>
    );
  };

  renderPageElements = () => {
    if (this.state.load === "sucess") {
      return (
        <div>
          <div id="containerInformation">
            <SearchDescription
              title={this.state.header.title}
              description={this.state.header.description}
              date={this.state.header.dateCriation}
              totalRegisters={this.state.dataTable.length}
              url={`/grafico/${this.paramId()}`}
              linkId={this.paramId()}
              icon={graphElement}
              descriptionIcon={"Dados Analíticos"}
              id={this.paramId()}
              urlSend={`${
                process.env.REACT_APP_HOST_LOCAL
              }/resposta/${this.paramId()}`}
            />
          </div>

          <div id="container">
            <div id="actionsTableSearch">
              <CSVLink
                id="csvButton"
                data={this.state.dataTable}
                headers={this.state.headerTable}
                filename={`${this.state.header.title}.csv`}
                target="_blank"
              >
                Exportar.csv
              </CSVLink>

              <ReactToExcel
                table="table-to-xls"
                filename={this.state.header.title}
                sheet="tablexls"
                buttonText="Exportar.xls"
              />

              <span id="searchElement">
                <input
                  id="inputSearch"
                  value={this.state.searchTerm}
                  type="text"
                  placeholder="Nome Pesquisador"
                  onChange={(e) => this.filterResearch(e)}
                />
                <img id="buttonSearch" src={searchIcon} alt="icone lupa" />
              </span>
            </div>

            <div id="tableContainer">
              <table id="tableDataSearch">
                <tr style={headerTable}>
                  <>
                    <td style={inputHeaderTable}></td>
                    {this.state.questions.map((e, i) => (
                      <td style={inputHeaderTable}>
                        {" "}
                        {i + 1}.{" "}
                        <input
                          style={inputHeaderTable}
                          type="text"
                          value={e.query.title}
                        />{" "}
                        <p hidden>{e.query.title}</p>
                      </td>
                    ))}
                    <td style={inputHeaderTable}>
                      <b>Audio</b>
                    </td>

                    <td style={inputHeaderTable}>Pesquisador</td>

                    <td style={inputHeaderTable}>Data</td>
                  </>
                </tr>

                {this.state.searchResults.map((element, index) => (
                  <>
                    <tr>
                      <td style={lineTable}>{start + index + 1}</td>
                      {element.questions.map((e, i) => (
                        <>{this.renderInputElementDataTable(e, i)}</>
                      ))}
                      <td id="audioColum" style={lineTable}>
                        <a
                          href={element.linkAudio}
                          id="audioButton"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Audio
                        </a>
                        <span hidden>{element.linkAudio}</span>
                      </td>

                      <td id="researchName" style={lineTable}>
                        <input
                          id="tdInput"
                          style={lineTable}
                          type="text"
                          value={element.thisResearcherResponse}
                        />
                        <span hidden>{element.thisResearcherResponse}</span>
                      </td>

                      <td id="dateResponse" style={lineTable}>
                        {element.dateResponse}
                      </td>
                    </tr>
                  </>
                ))}
              </table>
            </div>

            <table hidden id="table-to-xls" >
              {this.table_to_xls()}
            </table>
            <div id="containerPaginate">{this.renderPaginate()}</div>
          </div>
        </div>
      );
    } else if (this.state.load === "Inprogress") {
      return (
        <div>
          <Loading />
        </div>
      );
    } else if (this.state.load === "NoLoadingData") {
      return <SearchDataNull />;
    }
  };

  render() {
    return (
      <div>
        <Header
          id="header"
          icon={painelElement}
          descriptionIcon="icone de documento"
          title="Painel de Controle"
        />
        {this.renderPageElements()}
      </div>
    );
  }
}
export default Search;
