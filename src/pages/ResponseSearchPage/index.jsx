import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

import HeaderSearch from "./Components/HeaderSearch";
import VerticallyCenteredModal from "./Components/VerticallyCenteredModal";

import "./index.css";

const data = new Date();

function date() {
  if (data.getDate() <= 9 && data.getMonth() <= 9) {
    return `0${data.getDate()}/0${data.getMonth() + 1}/${data.getFullYear()}`;
  } else if (data.getDate() <= 9) {
    return `0${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  } else if (data.getMonth() <= 9) {
    return `${data.getDate()}/0${data.getMonth() + 1}/${data.getFullYear()}`;
  }
}

class ResponseSearchPage extends Component {
  state = {
    modalShow: false,
    form: [
      {
        title: "",
        description: "",
        dateCriation: date(),
        dateResponse: "",
        coordinates: [],
        responsibles: [],
        thisResearcherResponse: [],
        linkAudio: "",
        questions: [
          {
            query: {
              sectionTitle: "",
              isConditional: "false",
              title: "",
              idQuery: "",
              response: {
                type: "",
                res: [],
                alternative: [""],
              },
            },
          },
        ],
      },
    ],
  };

  paramId = () => {
    const {
      match: { params },
    } = this.props;
    return params.id;
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_HOST}/pesquisa/${this.paramId()}`)
      .then((res) => {
        const form = res.data;
        delete form[0]._id;
        this.setState({ form });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let form = this.state.form;
    form[0].thisResearcherResponse = "Link Compartilhado";
    form[0].dateResponse = date();
    this.setState({ form: form });

    axios
      .post(
        `${process.env.REACT_APP_HOST}/UploadRespostasPesquisa`,
        this.state.form
      )
      .then((res) => {
        console.log(res);
        if (res.data === "OK") {
          var modalShow = true;
          this.setState({ modalShow });
        }
      });
  };

  /**Métodos de Inserção no state do formulário */
  textChange = (e, index) => {
    let form = this.state.form;
    form[0].questions[index].query.response.res[0] = e.target.value;
    this.setState({ form: form });
  };

  insertMultiple = (e, index) => {
    let form = this.state.form;
    form[0].questions[index].query.response.res[0] = e.target.value;
    this.setState({ form: form });
  };

  insertselect = (e, index) => {
    let form = this.state.form;
    if (e.target.checked) {
      form[0].questions[index].query.response.res.push(e.target.defaultValue);
      this.setState({ form: form });
    } else if (!e.target.checked) {
      var indexSelect = this.state.form[0].responsibles.indexOf(
        e.target.defaultValue
      );
      this.state.form[0].questions[index].query.response.res.splice(
        indexSelect,
        1
      );
    }
  };

  getDateSearch = (e, index) => {
    var dateInvert = e.target.value.split("-");
    var date = dateInvert[2] + "/" + dateInvert[1] + "/" + dateInvert[0];

    let form = this.state.form;
    form[0].questions[index].query.response.res[0] = date;
    this.setState({ form: form });
  };
  /*********/

  renderQuestion = (element, index) => {
    if (element.query.response.type === "multiple") {
      return element.query.response.alternative.map((el, i) => (
        <div>
          <Form.Group  controlId="formBasicText">
            <Form.Check
              type="radio"
              id="default-radio"
              name="radioInput"
              label={el}
              value={el}
              onChange={(e) => this.insertMultiple(e, index)}
            />
          </Form.Group>
        </div>
      ));
    } else if (element.query.response.type === "select") {
      return element.query.response.alternative.map((el, i) => (
        <div required>
          <Form.Group controlId="formBasicText">
            <Form.Check
              type="checkBox"
              id="default-checkBox"
              label={el}
              value={el}
              onChange={(e) => this.insertselect(e, index)}
            />
          </Form.Group>
        </div>
      ));
    } else if (element.query.response.type === "text") {
      return (
        <Form.Group controlId="formBasicText">
          <Form.Control
            className="container-sm"
            type="text"
            placeholder="Sua resposta"
            onChange={(e) => this.textChange(e, index)}
            required
          />
        </Form.Group>
      );
    } else if (element.query.response.type === "phone") {
      return (
        <Form.Group controlId="formBasicTel">
          <Form.Control
            className="container-sm"
            type="tel"
            placeholder="Telefone"
            onChange={(e) => this.textChange(e, index)}
            required
          />
        </Form.Group>
      );
    } else if (element.query.response.type === "email") {
      return (
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            className="container-sm"
            type="email"
            placeholder="email"
            onChange={(e) => this.textChange(e, index)}
            required
          />
        </Form.Group>
      );
    } else if (element.query.response.type === "date") {
      return (
        <Form.Group controlId="formBasicDate">
          <Form.Control
            className="dataInputForm"
            type="date"
            name="date"
            onChange={(e) => this.getDateSearch(e, index)}
            required
          />
        </Form.Group>
      );
    } else if (element.query.response.type === "cpf") {
      return (
        <Form.Group controlId="formBasicCpf">
          <Form.Control
            className="container-sm"
            type="text"
            name="cpf"
            onChange={(e) => this.textChange(e, index)}
            required
          />
        </Form.Group>
      );
    } else {
      return (
        <Form.Group controlId="formBasic">
          <Form.Control
            className="container-sm"
            type="text"
            name="basic"
            onChange={(e) => this.textChange(e, index)}
            required
          />
        </Form.Group>
      );
    }
  };

  setModalShow = (valueStausModal) => {
    var modalShow = valueStausModal;
    this.setState({ modalShow });
    if (valueStausModal === false) {
      window.location.reload();
    }
  };

  rendersection = (element) => {
    if (
      element.query.sectionTitle !== undefined &&
      element.query.sectionTitle !== " "
    ) {
      return (
        <Container id="sectionTitleContainer" className="mb-1 p-2 text-white d-flex justify-content-center" fluid="md">
          <p className="mb-0 fw-bolder">{element.query.sectionTitle}</p>
        </Container>
      );
    }
  };

  render() {
    return (
      <div className="responseContainer">
        <HeaderSearch
          titleSearch={this.state.form[0].title}
          DescriptionSearch={this.state.form[0].description}
        />
        <Container className="containerForm container-md justify-content-center">
          <Form className="" onSubmit={this.handleSubmit}>
            <div id="queryResponse">
              {this.state.form[0].questions.map((element, index) => (
                <>
                  {this.rendersection(element)}

                  <Container id='containerQuestion' className="mb-3 p-4 border rounded" fluid="md">
                    <Form.Label id="titleQueryForm" className="fw-bolder textAdjuste text-body fw-bold mb-3 d-flex justify-content-center">
                      {element.query.title}
                    </Form.Label>
                    <Container className="border pt-3"> {this.renderQuestion(element, index)}</Container>
                   
                  </Container>
                </>
              ))}
            </div>
            <Button variant="primary" type="submit">
              Enviar
            </Button>

            <VerticallyCenteredModal
              show={this.state.modalShow}
              titleSearch={this.state.form[0].title}
              onHide={() => this.setModalShow(false)}
            />
          </Form>

          <footer className="" id="footerResponseSearch">
            <p className="">Datailha Forms - 2021</p>
          </footer>
        </Container>
      </div>
    );
  }
}

export default ResponseSearchPage;
