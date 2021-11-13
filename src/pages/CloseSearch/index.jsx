import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-awesome-modal';

import axios from 'axios';

import Header from '../../Components/Header'
import SearchComponentElement from "../../Components/SearchList"

import painelElement from '../../assets/summarize-24px.svg'
import deleteElement from '../../assets/delete-24px.svg'
import warningElement from '../../assets/warning.svg'
import restoreIcon from '../../assets/restore.svg'

import './index.css'

var idDelete = ""
class CloseSearch extends Component {
    state = {
        visible: false,
        deleteSearch: false,
        researches: []
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HOST}/pesquisasEncerradas`)
            .then(res => {
                const researches = res.data

                this.setState({ researches });
            })
    }

    deleteSubmit = (id) => {
        axios.delete(`${process.env.REACT_APP_HOST}/deletarPesquisa/${id}`)
            .then(res => {
                console.log("Ok")
            })
        window.location.reload();
    }

    openSearchSubmit = (id) => {
        this.state.researches.map((element) => {
            if (element._id == id) {
                axios.post(`${process.env.REACT_APP_HOST}/ativarPesquisa/${id}`, element)
                    .then(res => {
                        console.log("Ok")
                    })
            }
            window.location.reload();
        })

    }

    render() {
        return (
            <div>
                <Header icon={painelElement} descriptionIcon="icone de documento" title="Painel de Controle" className="header" />
                <p id="titlePage">Pesquisas encerradas</p>
                <hr />

                <div id="closeSearch">
                    {this.state.researches.map((element, index) =>
                        <div key={index}>
                            <div id="containerSearch">
                                <Link to={`/pesquisa/${element._id}`}>
                                    <SearchComponentElement titleSearch={element.title} description={element.description} value={element.title} dataOfCriation={element.dateCriation} />
                                </Link>

                                <div onClick={() => this.openSearchSubmit(element._id)} id="restoreIcon">
                                    <img src={restoreIcon} alt="Icone de restauração de pesqusia" />
                                </div>

                                <div id="deleteIcon" onClick={() => this.openModal(element._id)}>
                                    <img src={deleteElement} alt="Icone de lixeira" />
                                </div>
                                <div>
                                    <Modal visible={this.state.visible} width="33%" height="35%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                        <div id="modal-message">
                                            <p>Os dados da pesquisa serão todos excluídos! Confirma?</p>
                                            <img src={warningElement} alt="Icone de alerta" />
                                            <a id="deleteButton" href="javascript:void(0);" ><div onClick={() => this.deleteSubmit(idDelete)}>Excluir Pesquisa</div></a>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    openModal(id) {
        this.setState({
            visible: true
        });
        idDelete = id
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }
}

export default CloseSearch