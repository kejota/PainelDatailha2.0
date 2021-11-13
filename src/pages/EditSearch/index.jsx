import React, { Component } from 'react'
import axios from "axios"
import Modal from 'react-awesome-modal';

import Header from "../../Components/Header"
import PageDescription from "../../Components/PageDescription"

import editElement from '../../assets/create-24px.svg'
import circleElement from '../../assets/radio_button_unchecked-24px.svg'
import boxElement from '../../assets/check_box_outline_blank-24px.svg'
import addElement from '../../assets/add_circle-24px.svg'
import sendElement from '../../assets/send-24px.svg'
import SucessElement from '../../assets/sucess.svg'
import deleteSelectedResearch from '../../assets/deleteSelected.svg'
import penIcon from '../../assets/pen.svg'
import imageIcon from '../../assets/imageIcon.svg'
import brushIcon from '../../assets/brush.svg'
import reorderUopIcon from '../../assets/expand_less.svg'
import reorderDownIcon from '../../assets/expand_more.svg'

import "./index.css"

const divStyleDelete = {
    color: '#476ab0',
    cursor: 'pointer'
};

const divStyleAddOption = {
    color: '#476ab0',
    cursor: 'pointer'
};

const data = new Date()


function date() {
    if (data.getDate() <= 9 && data.getMonth() <= 9) {
        return (`0${data.getDate()}/0${data.getMonth() + 1}/${data.getFullYear()}`)
    } else if (data.getDate() <= 9) {
        return (`0${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`)
    } else if (data.getMonth() <= 9) {
        return (`${data.getDate()}/0${data.getMonth() + 1}/${data.getFullYear()}`)
    }
}

class Edit_Search extends Component {
    constructor() {
        super();
        this.state = {
            checkValue: '',
            visibleSectionModal: false,
            peopleResearchs: [],
            cityes: [],
            stateUF: [],
            form: [{
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
                                alternative: [
                                ]
                            }
                        }
                    }
                ]
            }]
        };
    }

    paramId = () => {
        const { match: { params } } = this.props;
        return params.id
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HOST}/liberacao/${this.paramId()}`)
            .then(res => {
                let form = this.state.form;
                form[0] = res.data[0]
                this.setState({ form: form });
            });

        axios.get(`${process.env.REACT_APP_HOST}/listarPesquisadores`).then(res => {
            const peopleResearchs = res.data
            this.setState({ peopleResearchs })
        })

        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/15/municipios").then(res => {
            const cityes = res.data
            this.setState({ cityes: cityes })
        })

        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => {
            const stateUF = res.data
            this.setState({ stateUF: stateUF })
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_HOST}/atualizarPesquisa/${this.paramId()}`, this.state.form)
            .then(res => {
                console.log("Ok")
            })

        //window.location.reload();
    }

    editTitle = (i, e) => {
        let form = this.state.form;
        form[0].title = e.target.value;
        this.setState({ form: form });
    }

    selectChecked = (e, element) => {
        let form = this.state.form
        if (e.target.checked) {
            const result = this.state.form[0].responsibles.find(responsible => responsible === e.target.defaultValue);
            if (result) {
                return
            }
            form[0].responsibles.push(e.target.defaultValue)
            this.setState({ form: form });
        } else if (!e.target.checked) {
            var index = this.state.form[0].responsibles.indexOf(e.target.defaultValue)
            form[0].responsibles.splice(index, 1)
        }
    }

    renderOptionsSelectedResearchs = (element) => {
        let check = ''
        this.state.form[0].responsibles.map((ele) => {
            if (ele == element._id) {
                check = "true"
            }
        })
        return <span id="ResearchsOptions">
            <div>
                <input type="checkbox" checked={check} value={element._id} onClick={e => this.selectChecked(e, element)} id="scales" />
                <label id="nameResearch" for="scales">{element.user}</label>
            </div>
            <a id="RemoveSelected" href="#"><img src={deleteSelectedResearch} alt="Lixeira" /></a>
        </span>
    }

    render() {
        return (
            <div>
                <Header />
                <PageDescription icon={editElement} descriptionIcon={"elemeto de editar"} title={"Editar Pesquisa"} />
                <span id="information">As alterações realizadas são permanentes, até que haja uma nova edição</span>

                <div id="container">
                    <div className="central">
                        <div></div>
                        <form id="formSearchEdit" onSubmit={this.handleSubmit}>
                            <div className="formBase">
                                <div id="formTitle">
                                    <input type="text" name="title" id="" onChange={e => this.insertTitle(e)} placeholder="Título do formulário" value={this.state.form[0].title} />
                                </div>
                                <div id="formDescript">
                                    <input type="text" name="description" onChange={e => this.insertDescription(e)} placeholder="Descrição do formulário" value={this.state.form[0].description} />
                                </div>
                            </div>

                            <hr />

                            <div id="querys">
                                {this.state.form[0].questions.map((element, index) =>
                                    <div key={index}>
                                        {this.query(index, element)}
                                    </div>
                                )}

                            </div>

                            <div id="actionQuery">
                                <span onClick={() => this.openModal()} id="send"><button type="submit"><img src={sendElement} alt="icone enviar" /></button></span>
                            </div>
                        </form>

                        <div id="ResearchsListDefined">
                            <div id="titleSelectResearchs"><p>Pesquisadores</p></div>
                            <div id="listResearchsDefined">
                                {this.state.peopleResearchs.map((element, index) =>
                                    <div>
                                        {this.renderOptionsSelectedResearchs(element, index)}
                                    </div>
                                )}
                            </div>
                        </div>

                        <section>
                            <Modal visible={this.state.visible} width="25%" height="30%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                <div id="modal-message">
                                    <p>Pesquisa alterada com sucesso!</p>
                                    <img src={SucessElement} alt="Icone de sucesso" />
                                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>OK</a>
                                </div>
                            </Modal>
                        </section>
                    </div>
                </div>
            </div>
        )
    }

    reorderIdQuery = () => {
        let form = this.state.form;
        form[0].questions.map((e, i) => {
          e.query.idQuery = `${i}`;
        });
        this.setState({ form: form });
      };

    insertTitle(e) {
        let form = this.state.form;
        form[0].title = e.target.value;
        this.setState({ form: form });
    }

    insertDescription(e) {
        let form = this.state.form;
        form[0].description = e.target.value;
        this.setState({ form: form });
    }

    insertTitleQuestions(index, e) {
        let form = this.state.form;
        form[0].questions[index].query.title = e.target.value;
        this.setState({ form: form });
    }

    insertType(index, e) {
        if (e.target.value === "sexo") {
            let form = this.state.form;
            form[0].questions[index].query.response.type = e.target.value;
            form[0].questions[index].query.response.alternative[0] = "Masculino";
            form[0].questions[index].query.response.alternative[1] = "Feminino"
            this.setState({ form: form });
          } else {
            let form = this.state.form;
            form[0].questions[index].query.response.type = e.target.value;
            this.setState({ form: form });
          }
    }

    insertOption(indexQuery, index, e) {
        let form = this.state.form;
        form[0].questions[indexQuery].query.response.alternative[index] = e.target.value;
        this.setState({ form: form });
    }

    insertOptional(index, e) {
        let form = this.state.form;
        form[0].questions[index].query.isConditional = e.target.value;
        this.setState({ form: form });
    }

    newOption = (indexQuery) => {
        let form = this.state.form;
        form[0].questions[indexQuery].query.response.alternative.push("");
        this.setState({ form: form });
    }

    removeOption = (indexQuery, index) => {
        let form = this.state.form;
        form[0].questions[indexQuery].query.response.alternative.splice(index, 1);
        this.setState({ form: form });
    }

    insertCityState(index, e) {
        let form = this.state.form;
        form[0].questions[index].query.response.res[0] = e.target.value
        this.setState({ form: form });
    }

    renderSelectCity = (index, element) => {
        return (
            <div id="text_response">
                <div id="option_text">
                    <select name="city" value={element.query.response.res} id="cytySelect" onChange={e => this.insertCityState(index, e)}>
                        <option value="cyty" select>Selecione a cidade</option>
                        {this.state.cityes.map((el, i) =>
                            <option value={el.nome}>{el.nome}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }

    renderSelectStateUf = (index) => {
        return (
            <div id="text_response">
                <div id="option_text">
                    <select name="stateUF" id="stateUfSelect" onChange={e => this.insertCityState(index, e)}>
                        <option value="stateUF" select>Selecione o estado</option>
                        {this.state.stateUF.map((el, i) =>
                            <option value={el.nome}>{el.nome}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }

    renderOptionsSexo = () => {
        return (
          <div id="optionUniqueResponse">
            <p id="optionSexo">
              <img src={circleElement} alt="botão de opção" /> Masculino
            </p>
            <p id="optionSexo">
              <img src={circleElement} alt="botão de opção" /> Feminino
            </p>
          </div>
        );
      };
    
      renderSelectedOption = (index, selectedOption) => {
        if (selectedOption == "multiple") {
          return this.renderContainerMultiple(index);
        } else if (selectedOption == "select") {
          return this.renderContainerSelect(index);
        } else if (
          selectedOption == "text" ||
          selectedOption == "moeda" ||
          selectedOption == "numero" ||
          selectedOption == "cpf" ||
          selectedOption == "cnpj" ||
          selectedOption == "phone" ||
          selectedOption == "email" ||
          selectedOption == "cep" ||
          selectedOption == "date"
        ) {
          return this.renderContainerText(selectedOption);
        } else if (selectedOption === "city") {
          return this.renderSelectCity(index);
        } else if (selectedOption === "stateUF") {
          return this.renderSelectStateUf(index);
        } else if (selectedOption === "sexo") {
          return this.renderOptionsSexo(index);
        } else if (selectedOption === "filtro") {
            return this.renderContainerMultiple(index);
        } else return this.renderConatinerIcon(selectedOption);
      };

    nextMoveQuery = (index) => {
        let form = this.state.form
        const thisQuery = form[0].questions[index]
        const nextQuery = form[0].questions[index + 1]

        if (index < form[0].questions.length - 1) {
            form[0].questions[index] = nextQuery
            form[0].questions[index + 1] = thisQuery
        }
        this.setState({ form: form })
        this.reorderIdQuery()
    }

    previosMoveQuery = (index) => {
        let form = this.state.form
        const thisQuery = form[0].questions[index]
        const previosQuery = form[0].questions[index - 1]

        if (index > 0) {
            form[0].questions[index] = previosQuery
            form[0].questions[index - 1] = thisQuery
        }
        this.setState({ form: form })
        this.reorderIdQuery()
    }

    reorderIconVisible = (index) => {
        let form = this.state.form
        console.log(form[0].questions.length - 1)
        if (index === 0) {
            var reorderTopElement = document.getElementById("reorder_top")
            reorderTopElement.setAttribute("hidden", true)
        }
    }

    setTitleSection = (index, e) => {
        let form = this.state.form
        form[0].questions[index].query.sectionTitle = e.target.value
        this.setState({ form: form })
    }

    setTitleDefaltSection = (index) => {
        let form = this.state.form
        form[0].questions[index].query.sectionTitle = "Defina o título da seção"
        this.setState({ form: form })
    }

    closeSectionInput = (index) => {
        let form = this.state.form
        form[0].questions[index].query.sectionTitle = " "
        this.setState({ form: form })
    }

    renderSection = (index, element) => {
        if (element.query.sectionTitle != undefined && element.query.sectionTitle != " ") {
            return (
                <div>
                    <hr />
                    <div id="sectionContent">
                        <input type="text" value={element.query.sectionTitle} onChange={e => this.setTitleSection(index, e)} placeholder="Título de Seção" />
                        <a id="closeSectionContent" href="#" onClick={() => this.closeSectionInput(index)}>x</a>
                    </div>
                </div>
            )
        }
    }

    query = (index, element) => {
        return (
            <section id={index} className="sectionQuery">

                {this.renderSection(index, element)}

                <div id="query" className={index} onMouseOver={() => this.reorderIconVisible(index)}>
                    <div id="reorder_top" onClick={() => this.previosMoveQuery(index)}>
                        <img src={reorderUopIcon} alt="IconReorder" id="iconTopMove" />
                    </div>
                    {this.renderCardSelector(index, element)}
                    <div id="response">
                        {this.renderSelectedOption(index, this.state.form[0].questions[index].query.response.type, element)}
                        <hr />
                    </div>

                    <div id="footerQuestion">
                        <span>
                            <select name="OptionalSelect" id="optional" value={element.query.isConditional} onChange={e => this.insertOptional(index, e)}>
                                <option value="false" selected>Não Condicional</option>
                                <option value="true">Condicional</option>
                            </select>
                        </span>
                        <a id="buttonSectionOpenModal" href="#" onClick={() => this.setTitleDefaltSection(index)}>Título de Seção</a>
                    </div>
                    <div id="reorder_down" onClick={() => this.nextMoveQuery(index)}>
                        <img src={reorderDownIcon} alt="IconReorder" />
                    </div>
                </div>
            </section>
        )
    }

    renderCardSelector(index, element) {
        return (
          <div id="title_response">
            <input
              type="text"
              name="titleQuery"
              id="titleQuery"
              value={this.state.form[0].questions[index].query.title}
              onChange={(e) => this.insertTitleQuestions(index, e)}
              placeholder="Digite a pergunta"
            />
    
            <select
              id="type_response"
              name="select"
              value={element.query.response.type}
              onChange={(e) => this.insertType(index, e)}
            >
              <option value="" selected>
                Selecione uma opção
              </option>
              <option value="multiple">Escolha multipla</option>
              <option value="select">Caixa de seleção</option>
              <option value="text">Resposta de texto</option>
              <option value="numero">Numero</option>
              <option value="moeda">R$ (Moeda)</option>
              <option value="date">Data</option>
              <option value="cpf">CPF</option>
              <option value="sexo">Sexo</option>
              <option value="cnpj">CNPJ</option>
              <option value="phone">Telefone</option>
              <option value="email">Email</option>
              <option value="cep">CEP</option>
              <option value="stateUF">Estado</option>
              <option value="city">Cidade</option>
              <option value="filtro">Local de aplicação</option>
              <option value="digitalSignature">Assinatura Digital</option>
              <option value="image">Foto</option>
              <option value="croqui">Croqui</option>
            </select>
          </div>
        );
      }

    renderContainerMultiple(indexQuery) {
        return (
            <div id="optionUniqueResponse">
                {this.state.form[0].questions[indexQuery].query.response.alternative.map((element, index) =>
                    <div key={index}>
                        <div id="option">
                            <img src={circleElement} alt="botão de opção" />
                            <input type="text" name="option_select" id="option_select" value={element} onChange={e => this.insertOption(indexQuery, index, e)} placeholder="Resposta" />
                            <a style={divStyleDelete} onClick={() => this.removeOption(indexQuery, index)} id="delete" >x</a>
                        </div>
                    </div>
                )}
                <div id="addOption">
                    <img src={addElement} alt="botão de opção" />
                    <a style={divStyleAddOption} onClick={() => this.newOption(indexQuery)} >Adicionar</a>
                </div>
            </div>
        )
    }

    renderContainerSelect(indexQuery) {
        return (
            <div id="optionMultipleResponse">
                {this.state.form[0].questions[indexQuery].query.response.alternative.map((element, index) =>
                    <div key={index}>
                        <div id="option">
                            <img src={boxElement} alt="botão de opção" />
                            <input type="text" name="multiple_select" id="option_select" value={element} onChange={e => this.insertOption(indexQuery, index, e)} placeholder="Resposta" />
                            <a style={divStyleDelete} onClick={() => this.removeOption(indexQuery, index)} id="remove">x</a>
                        </div>
                    </div>
                )}
                <div id="addOption">
                    <img src={addElement} alt="botão de opção" />
                    <a style={divStyleAddOption} onClick={() => this.newOption(indexQuery)}>Adicionar</a>
                </div>
            </div>
        )
    }

    renderContainerText(selectedOption) {
        if (selectedOption == "text") {
            return (
                <div id="text_response">
                    <div id="option_text">
                        <textarea name="text_response" disabled="true" value="Resposta Textual" id="text_response_line1"></textarea>
                        <textarea disabled="true" id="text_response_line"></textarea>
                    </div>
                </div>
            )
        } else if (selectedOption == "phone") {
            return (
                <div id="text_response">
                    <div id="option_text">
                        <textarea name="text_response" disabled="true" value="Telefone" id="text_response_line1"></textarea>
                        <textarea disabled="true" id="text_response_line"></textarea>
                    </div>
                </div>
            )
        } else if (selectedOption == "city") {
            return (
                <div id="text_response">
                    <div id="option_text">
                        <textarea name="text_response" disabled="true" value="Belém/PA" id="text_response_line1"></textarea>
                        <textarea disabled="true" id="text_response_line"></textarea>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div id="text_response">
                    <div id="option_text">
                        <textarea name="text_response" disabled="true" value={selectedOption} id="text_response_line1"></textarea>
                        <textarea disabled="true" id="text_response_line"></textarea>
                    </div>
                </div>
            )
        }
    }

    renderConatinerIcon(selectedOption) {
        if (selectedOption == "image") {
            return (
                <div>
                    <img id="imageElement" src={imageIcon} alt="Icone Imagem" />
                </div>
            )
        } else if (selectedOption == "digitalSignature") {
            return (
                <div >
                    <img id="imageElement" src={penIcon} alt="Icone Caneta" />
                </div>
            )
        } else if (selectedOption === "croqui") {
            return (
                <div >
                    <img id="imageElement" src={brushIcon} alt="Icone Desenho" />
                </div>
            )
        }
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    openModalTitleSection() {
        this.setState(
            {
                visibleSectionModal: true
            }
        )
    }

    closeModalTitleSection() {
        this.setState(
            {
                visibleSectionModal: false
            }
        )
    }
}

export default Edit_Search