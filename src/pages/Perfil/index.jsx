import React, { Component } from 'react'
import axios from "axios"
import InputMask from "react-input-mask";
import Modal from 'react-awesome-modal';

import Header from "../../Components/Header"
import PageDescription from "../../Components/PageDescription"

import personAdmin from '../../assets/manage_accounts.svg'
import deleteElement from '../../assets/delete-24px.svg'
import adminAdd from '../../assets/adminAdd.svg'
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
        listAdmin: [],
        admin: [{
            name: "",
            cpf: "",
            perfil: ""
        }]
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HOST}/listarAdmin`).then(res => {
            const listAdmin = res.data
            this.setState({ listAdmin })
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        var messageStatus = this.state.messageStatus
        if (this.state.admin[0].name != "" && this.state.admin[0].cpf != "") {
            axios.post(`${process.env.REACT_APP_HOST}/adicionarAdmin`, this.state.admin[0])
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
            messageStatus = `Administrador(a) ${this.state.admin[0].perfil} Adicionado!`
            this.setState({ messageStatus: messageStatus })
        } else {
            messageStatus = "Cadastro incompleto, verifique!"
            this.setState({ messageStatus: messageStatus })
        }
    }

    statusIcon = () => {
        if (this.state.messageStatus == `Administrador(a) ${this.state.admin[0].perfil} Adicionado!`) {
            return (<img src={SucessElement} alt="Icone de sucesso" />)
        } else if (this.state.messageStatus == "Cadastro incompleto, verifique!") {
            return (<img src={NosucessElement} alt="Icone de alerta" />)
        }
    }

    deleteSubmit = (id) => {
        axios.delete(`${process.env.REACT_APP_HOST}/excluirAdmin/${id}`)
            .then(res => {
                console.log("Ok")
            })
        window.location.reload();
    }

    insertName(e) {
        let admin = this.state.admin;
        admin[0].name = e.target.value;
        this.setState({ admin: admin });
    }

    insertCpf(e) {
        let admin = this.state.admin;
        admin[0].cpf = e.target.value;
        this.setState({ admin: admin });
    }

    /**if (e.target.checked) {
      form[0].responsibles.push(e.target.defaultValue)
      this.setState({ form: form });
    } else if (!e.target.checked) {
      var index = this.state.form[0].responsibles.indexOf(e.target.defaultValue)
      this.state.form[0].responsibles.splice(index, 1)
    } */

    insertPerfil(e) {
        let admin = this.state.admin;
        if (e.target.checked) {
            admin[0].perfil = e.target.value;
            this.setState({ admin: admin });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <PageDescription icon={personAdmin} descriptionIcon="elemento pessoa adimin" title="Usuários Administrativos Painel" />

                <div id="InformationElement">
                    <div id="elementGrid">
                        <p>Usuários Administrativos</p>
                        <a id="addAdmin" onClick={() => this.openModal()}><img src={adminAdd} alt="adicionar usuário admin" />Novo</a>
                    </div>
                    <hr />
                </div>

                <div>
                    <Modal visible={this.state.visible} width="27%" height="40%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div id="modal-messageAdmin">
                            <p>Adicionar Novo Administrador</p>
                            <form id="formElement" onSubmit={this.handleSubmit}>
                                <div>
                                    <input id="addInput" onChange={e => this.insertName(e)} placeholder="Nome" type="text" name="name" />
                                </div>
                                <div>
                                    <InputMask id="addInput" type="text" mask="999.999.999-99" placeholder="CPF" onChange={e => this.insertCpf(e)} name="cpf"></InputMask>
                                </div>
                                <div id="profile">
                                    <input id="radioInput" value="Master" onChange={e => this.insertPerfil(e)} placeholder="Perfil" type="radio" name="perfil" />
                                    <label id="optionLabel" htmlFor="Master">Master</label>
                                    <input id="radioInput" value="Slave" onChange={e => this.insertPerfil(e)} placeholder="Perfil" type="radio" name="perfil" />
                                    <label id="optionLabel" htmlFor="Slave">Slave</label>
                                </div>
                                <button id="buttonAddAdmin" onClick={() => this.openModalSubmit()} type="submit">Adicionar</button>
                            </form>
                        </div>
                    </Modal>
                </div>

                <div>
                    <Modal visible={this.state.visibleSumbit} width="25%" height="35%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div id="modal-messageAdmin">
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
                        <th>Perfil de Acesso</th>
                        <th id="actionTableHeader"></th>
                    </tr>
                    {this.state.listAdmin.map((element, index) =>
                        <tr key={index}>
                            <th id="numbeIndex">{index + 1}</th>
                            <th>{element.name}</th>
                            <th>{element.cpf}</th>
                            <th>{element.perfil}</th>
                            <th id="actionTable" onClick={() => this.openModalDelete(element._id)}> <img src={deleteElement} alt="Icone de lixeira" /></th>
                        </tr>
                    )}
                    <div id="modal-messageAdmin">
                        <Modal visible={this.state.visibleDelete} width="25%" height="30%" effect="fadeInUp" onClickAway={() => this.closeModalDelete()}>
                            <div id="modal-messageAdmin">
                                <p>Este Administrador será excluido!</p>
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