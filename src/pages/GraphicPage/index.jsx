import React, { Component } from "react";
import axios from "axios";
import Chart from "react-google-charts";

import Header from "../../Components/Header";
import SearchDescription from "../../Components/searchDescription";
import Loading from "../../Components/Loading";

import searchlElement from "../../assets/search.svg";
import tableIcon from "../../assets/table_view.svg";

import "./index.css";

const overflow = {
  "overflow-y": "auto",
  "overflow-x": "none",
  height: "100vh",
};
class GraphicPage extends Component {
  constructor() {
    super();
    this.state = {
      load: "Inprogress",
      header: [],
      data: [],
      questionsTemplate: [],
      questionsData: [],
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
        //Para a div de informações da pesquisa
        if (res.data[0] != undefined) {
          const header = res.data[0];
          this.setState({ header });
        }

        //Para o total de registros
        const data = res.data;
        this.setState({ data });

        //Para os cards de informações das perguntas
        if (res.data[0] != undefined) {
          const questionsTemplate = res.data[0].questions;
          this.setState({ questionsTemplate });
        }

        //Para agrupamamento de todas as respostas do formulário
        res.data.forEach((element) => {
          const questionsData = this.state.questionsData;
          questionsData.push(element.questions);
          this.setState({ questionsData });
        });

        if (res.statusText == "OK") {
          const load = "sucess";
          this.setState({ load });
        }
      });
  }

  render() {
    return <>{this.renderPage()}</>;
  }

  multipleGraphPie(index) {
    var dataheader = ["", ""];
    var alternatives = "";
    var responseRegister = "";

    this.state.questionsTemplate[index].query.response.alternative.forEach(
      (element) => {
        alternatives += element + ",";
      }
    );

    this.state.questionsData.map((element, i) => {
      responseRegister += element[index].query.response.res + ",";
    });

    const optionsData = alternatives.split(",");
    const responseSegment = responseRegister.split(",");

    var alternativeData = [];
    var i = 0;
    optionsData.forEach((element) => {
      var j = 0;
      var k = 0;
      responseSegment.forEach((el) => {
        if (element != "" && el != "" && element == el) {
          k = j += 1;
          alternativeData[i] = [el, j];
        }
      });
      i++;
    });

    var fullAlternativeData = [];
    alternativeData.map((element) => {
      fullAlternativeData.push(element);
    });

    var dataRes = [dataheader];
    var x = 0;
    fullAlternativeData.forEach((e) => {
      dataRes.push(fullAlternativeData[x]);
      x++;
    });

    return (
      <div>
        <Chart
          width={"41vw"}
          height={"19vw"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={dataRes}
          options={
            {
              //title: 'Gráfico de pizza',
            }
          }
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    );
  }

  selectGraphBar(index) {
    var alternatives = "";
    var responseRegister = "";

    this.state.questionsTemplate[index].query.response.alternative.forEach(
      (element) => {
        alternatives += element + ",";
      }
    );

    this.state.questionsData.map((element, i) => {
      responseRegister += element[index].query.response.res + ",";
    });

    const optionsData = alternatives.split(",");
    const responseSegment = responseRegister.split(",");

    var dataCount = [];
    var i = 0;
    optionsData.forEach((element) => {
      var j = 0;
      var y = i;
      responseSegment.forEach((el) => {
        if (element != "" && el != "" && element == el) {
          j += 1;
          dataCount[i] = j;
        } else if (element != el && element != "") {
          dataCount[y + 1] = 0;
        }
      });
      i++;
    });
    dataCount.pop();
    dataCount.push(".");

    return (
      <Chart
        width={"35vw"}
        height={"18vw"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[optionsData.reverse(), dataCount.reverse()]}
        options={{
          // Material design options
          chart: {
            title: "Grafico Demonstrativo de dados",
            subtitle: "Análise gráfica",
          },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
    );
  }

  TextGraphBar(index) {
    var responseRegister = "";

    // Seleção de todos os dados recebidos no gráfico
    this.state.questionsData.map((element, i) => {
      responseRegister += element[index].query.response.res + ",";
    });

    const responseSegment = responseRegister.split(",");
    var replace = responseSegment;

    //Filtragem dos dos dados para gerar as barras no gráfico
    const optionsData = [...new Set(replace)];
    //console.log(optionsData)

    var dataCount = [];
    var i = 0;
    optionsData.forEach((element) => {
      var j = 0;
      var y = i;
      responseSegment.forEach((el) => {
        if (element != "" && el != "" && element == el) {
          j += 1;
          dataCount[i] = j;
        } else if (element != el && element != "") {
          dataCount[y + 1] = 0;
        }
      });
      i++;
    });
    dataCount.pop();
    dataCount.push(".");
    return (
      <Chart
        width={"35vw"}
        height={"20vw"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[optionsData.reverse(), dataCount.reverse()]}
        options={{
          title: "Grafico Demonstrativo de dados",
          subtitle: "Análise gráfica",
          legend: { position: "none" },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
    );
  }

  typeRenderCard = (type, index) => {
    if (
      type === "text" ||
      type === "cpf" ||
      type === "cnpj" ||
      type === "phone" ||
      type === "email"
    ) {
      return <div id="chart">{this.TextGraphBar(index)}</div>;
    } else if (type === "multiple") {
      return <div id="chart">{this.multipleGraphPie(index)}</div>;
    } else if (type === "select") {
      return <div id="chart">{this.selectGraphBar(index)}</div>;
    }
  };

  renderPage = () => {
    if (this.state.load === "Inprogress") {
      return <Loading />;
    } else {
      return (
        <div style={overflow}>
          <Header
            id="header"
            icon={searchlElement}
            descriptionIcon="icone de documento"
            title="Painel de Controle"
          />
          <SearchDescription
            title={this.state.header.title}
            date={this.state.header.dateCriation}
            totalRegisters={this.state.data.length}
            url={`/pesquisa/${this.paramId()}`}
            icon={tableIcon}
            descriptionIcon={"Planilha"}
            linkId={`${this.paramId()}`}
          />
          <div id="containerGraph">
            {this.state.questionsTemplate.map((e, i) => (
              <div id="cardQuestion">
                <div id="headerCard">
                  <p>{e.query.title}</p>
                </div>
                <div id="cardContent" key={i}>
                  {this.typeRenderCard(e.query.response.type, i)}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };
}
export default GraphicPage;
