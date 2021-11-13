import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Modal from 'react-awesome-modal';

import axios from 'axios';

import Header from "../../Components/Header"
import SideNav from "../../Components/SideNav"
import SearchComponentElement from "../../Components/SearchList"
import PageDescription from "../../Components/PageDescription"

import painelElement from '../../assets/summarize-24px.svg'
import offSearchIcon from '../../assets/offSearch.svg'
import alertIcon from '../../assets/alert.svg'

import "./index.css"

var idSendClose = ""
class Painel extends Component {
  state = {
    visible: false,
    researches: [],
    role: ''
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_HOST}/pesquisas`)
      .then(res => {
        const researches = res.data
        this.setState({ researches });
        // console.log(this.state.researches)
      })
    var role = localStorage.getItem('role')
    this.setState({ role });
  }

  searchCloseSubmit = (id) => {
    this.state.researches.map((element) => {
      if (element._id == id) {
        axios.post(`${process.env.REACT_APP_HOST}/encerrarPesquisa/${id}`, element)
          .then(res => {
            console.log("Ok")
          })
      }
    })
   window.location.reload();
  }

  render() {
    return (
      <div className="containerElement">
        <Header icon={painelElement} title="Painel de Controle" role={this.state.role} className="header" />
        <div id="main">
          <SideNav />
          <section>
            <PageDescription icon={painelElement} descriptionIcon="imagem documento" title="Painel de Controle" />

            <div id="InformationElement">
              <p>Pesquisas em andamento:</p>
              <hr />
            </div>

            <div id="ResearchsListPainel">
              {this.state.researches.map((element, index) =>
                <div key={index}>
                  <div id="containerSearch">
                    <Link to={`/pesquisa/${element._id}`}>
                      <SearchComponentElement titleSearch={element.title} description={element.description} value={element.title} dataOfCriation={element.dateCriation} />
                    </Link>

                    <div id="offSeachIcon">
                      <img src={offSearchIcon} alt="Icone de encerrar" onClick={() => this.openModal(element._id)} />
                    </div>
                    <div></div>
                    <div>
                      <Modal visible={this.state.visible} width="27%" height="40%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div id="modal-message">
                          <p>Esta pesquisa será encerrada. Confirma?</p>
                          <img src={alertIcon} alt="Icone de alerta" />
                          <a id="deleteButton" href="javascript:void(0);" ><div onClick={() => this.searchCloseSubmit(idSendClose)}>Encerrar Pesquisa</div></a>
                        </div>
                      </Modal>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

      </div>
    );
  }
  onClick = {}

  openModal(id) {
    this.setState({
      visible: true
    });
    idSendClose = id
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }


}

export default Painel