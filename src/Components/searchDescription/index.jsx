import React from "react"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import calendarIcon from '../../assets/event-24px.svg'
import localizationElement from '../../assets/fmd_good-24px.svg'
import clipIcon from '../../assets/attach_file.svg'
import "./index.css"

function renderOptionsButton(id, linkId) {
    if (id === "610b51b3b8610e6f50700e5c") {
        return (
            <>
                <a id="requirement" href={`/requerimento/${linkId}`} target="_blank" rel="noopener noreferrer"><img src={clipIcon} alt="icone Clip" />    Requerimento     </a>

                <a id="requirement" href={`/declaracaoRequerimento/${linkId}`} target="_blank" rel="noopener noreferrer"><img src={clipIcon} alt="icone Clip" />    Declaração Requerimento     </a>
                
                <a id="requirement" href={`/autonomo/${linkId}`} target="_blank" rel="noopener noreferrer"><img src={clipIcon} alt="icone Clip" />    Autônomo     </a>

                <a id="requirement" href={`/uniaoEstavel/${linkId}`} target="_blank" rel="noopener noreferrer"><img src={clipIcon} alt="icone Clip" />    União estável     </a>

                <a id="requirement" href={`/posse/${linkId}`} target="_blank" rel="noopener noreferrer"><img src={clipIcon} alt="icone Clip" />    Declaração de Posse     </a>
            </>
        )
    } else if (id === "60c61edac815edde39aa71ab") {
        return (
            <>
                <a id="requirement" href={`/RelatorioEngenharia/${linkId}`} target="_blank" rel="noopener noreferrer"><img src={clipIcon} alt="icone Clip" />    Relatorio Engenharia    </a>
            </>
        )
    }

}

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        navigator.clipboard.writeText(textToCopy);
        toast.dark("Copiado Para Área de Transferência", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
            toast.dark("Copiado Para Área de Transferência", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

}

function renderCopyButton(id, url) {
    if (id !== "60c8f8f1c815edde39aa71c7" && id !== "60c61edac815edde39aa71ab") {
        return (
            <>
                <button id="buttonSendShare" value={url} onClick={e => copyToClipboard(e.target.value)}>Compartilhar</button>
                <ToastContainer />
            </>
        )
    }
}

function SearchDescription(props) {
    return (
        <span>
            <div>
                <div id="information">
                    <div id="left">
                        <h1 id="title">{props.title}</h1>
                        <p id="description"><b>Descrição</b>: {props.description}</p>
                        <p id="dateCriationForm"><img src={calendarIcon} alt="icone Calendário" />Criado em: <b>{props.date}</b></p>
                    </div>
                    <div></div>
                    <div>
                        <p>Total de Registros: <b>{props.totalRegisters}</b></p>
                        {renderCopyButton(props.id, props.urlSend)}
                    </div>
                </div>
                <div id="actionsGraph">
                    <Link id="linka" to={props.url}>
                        <img src={props.icon} alt="elemento gráfico" />{props.descriptionIcon}
                    </Link>

                    <Link id="linka" to={`/localizacao/${props.linkId}`}><img src={localizationElement} alt="elemento localização" />      Localização</Link>

                    {renderOptionsButton(props.id, props.linkId)}

                </div>
            </div>
            <hr />
        </span>
    )

}

export default SearchDescription