import React, { Component } from 'react'
import axios from "axios"
import InputMask from "react-input-mask";
import Modal from 'react-awesome-modal';

import Header from "../../Components/Header"
import PageDescription from "../../Components/PageDescription"

import personResearch from '../../assets/personReasearch.svg'
import deleteElement from '../../assets/delete-24px.svg'
import researchAdd from '../../assets/researchAdd.svg'
import warningElement from '../../assets/warning.svg'
import SucessElement from '../../assets/sucess.svg'
import NosucessElement from '../../assets/report.svg'

import './index.css'
var idDelete = ""
class Researchs extends Component {
    state = {
        visibleDelete: false,
        visibleSumbit: false,
        visible: false,
        messageStatus: " ",
        peopleResearchs: [],
        Research: [{
            user: "",
            cpf: "",
        }]
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HOST}/listarPesquisadores`).then(res => {
            const peopleResearchs = res.data
            this.setState({ peopleResearchs })
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        var messageStatus = this.state.messageStatus
        if (this.state.Research[0].user != "" && this.state.Research[0].cpf != "") {
            axios.post(`${process.env.REACT_APP_HOST}/adicionarPesquisador`, this.state.Research[0])
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
            messageStatus = "Pesquisador(a) Adicionado!"
            this.setState({ messageStatus: messageStatus })
        } else {
            messageStatus = "Cadastro incompleto, verifique!"
            this.setState({ messageStatus: messageStatus })
        }
    }

    statusIcon = () => {
        if (this.state.messageStatus == "Pesquisador(a) Adicionado!") {
            return (<img src={SucessElement} alt="Icone de sucesso" />)
        } else if (this.state.messageStatus == "Cadastro incompleto, verifique!") {
            return (<img src={NosucessElement} alt="Icone de alerta" />)
        }
    }

    deleteSubmit = (id) => {
        axios.delete(`${process.env.REACT_APP_HOST}/excluirPesquisador/${id}`)
            .then(res => {
                if(res.status === 200){
                    window.location.reload();
                }
            })
    }

    insertName(e) {
        let Research = this.state.Research;
        Research[0].user = e.target.value;
        this.setState({ Research: Research });
    }

    insertCpf(e) {
        let Research = this.state.Research;
        Research[0].cpf = e.target.value;
        this.setState({ Research: Research });
    }

    render() {
        return (
            <div>
                <Header />
                <PageDescription icon={personResearch} descriptionIcon="elemento pessoa pesquisadora" title="Pesquisadores" />

                <div id="InformationElement">
                    <div id="elementGrid">
                        <p>Pesquisadores Cadastrados</p>
                        <a id="addResearch" onClick={() => this.openModal()}><img src={researchAdd} alt="adicionar pesquisador" />Novo</a>
                    </div>
                    <hr />
                </div>

                <div>
                    <Modal visible={this.state.visible} width="27%" height="40%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div id="modal-message">
                            <p>Adicionar Novo Pesquisador</p>
                            <form id="formElement" onSubmit={this.handleSubmit}>
                                <div>
                                    <input id="addInput" onChange={e => this.insertName(e)} placeholder="Nome" type="text" name="user" />
                                </div>
                                <div>
                                    <InputMask id="addInput" type="text" name="cpf" mask="999.999.999-99" placeholder="Cpf" onChange={e => this.insertCpf(e)}></InputMask>
                                </div>
                                <button id="buttonAddResearch" onClick={() => this.openModalSubmit()} type="submit">Adicionar</button>
                            </form>
                        </div>
                    </Modal>
                </div>

                <div>
                    <Modal visible={this.state.visibleSumbit} width="25%" height="35%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div id="modal-message">
                            <p>{this.state.messageStatus}</p>
                            {this.statusIcon()}
                            <a href="javascript:void(0);" onClick={() => this.closeModalSubmit()}>OK</a>
                        </div>
                    </Modal>
                </div>

                <table id="tableResearchs">
                    <tr id="headerTable">
                        <th id="numbeIndex"></th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th id="actionTableHeader"></th>
                    </tr>
                    {this.state.peopleResearchs.map((element, index) =>
                        <tr key={index}>
                            <th id="numbeIndex">{index + 1}</th>
                            <th>{element.user}</th>
                            <th>{element.cpf}</th>
                            <th id="actionTable" onClick={() => this.openModalDelete(element._id)}> <img src={deleteElement} alt="Icone de lixeira" /></th>
                        </tr>
                    )}
                    <div>
                        <Modal visible={this.state.visibleDelete} width="27%" height="40%" effect="fadeInUp" onClickAway={() => this.closeModalDelete()}>
                            <div id="modal-message">
                                <p>Este pesquisador será excluido!</p>
                                <img src={warningElement} alt="Icone de alerta" />
                                <a id="deleteButton" href="javascript:void(0);" ><div onClick={() => this.deleteSubmit(idDelete)}>Excluir</div></a>
                            </div>
                        </Modal>
                    </div>
                </table>
            </div>
        )
    }

    openModal(id) {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
        window.location.reload();
    }

    openModalSubmit() {
        this.setState({
            visibleSumbit: true
        });
    }

    closeModalSubmit() {
        this.setState({
            visibleSumbit: false
        });
        window.location.reload();
    }

    openModalDelete(id) {
        this.setState({
            visibleDelete: true
        });
        idDelete = id
    }

    closeModalDelete() {
        this.setState({
            visibleDelete: false
        });
    }


}

export default Researchs
