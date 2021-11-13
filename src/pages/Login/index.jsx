import React, { Component } from 'react'
import axios from "axios"
import InputMask from "react-input-mask";

import LockElement from "../../assets/lock.svg"
import logo from '../../img/DatailhaLogo1.png'

import "./index.css"
function Login({ history }) {
    localStorage.clear()
    const user = {
        cpf: ""
    }

    function insertCpf (e) {
        user.cpf = e.target.value;
    }

    function submitForm() {
        if (user.cpf != "") {
            axios.post(`${process.env.REACT_APP_HOST}/auth`, user).then(res => {
                var token = res.data.token
                localStorage.setItem("token", token)
                history.push('/painel');
            }).catch(err => {
                console.log(err)
                alert("Usuário inválido!")
            })
        } else {
            alert("Insira o CPF de login")
        }
    }
    
    return (
        <div>
            <header>
                <div id="logo">
                    <div></div>
                    <img id="logoImg" src={logo} alt="logo Datailha" />
                </div>
                <span></span>
            </header>
            <div id="login">
                <div id="headerLogin">
                    <div id="back"><img src={LockElement} alt="icone cadeado" /></div>
                    <h3>Login</h3>
                </div>
                <div id="elementInput">
                    <InputMask name="cpf" mask="999.999.999-99" placeholder="CPF" onChange={e => insertCpf(e)}></InputMask>
                </div>
                <div id="buttonLogin">

                    <button onClick={() => submitForm()} type="submit">Entrar</button>

                </div>
            </div>
        </div>
    )

}

export default Login
