import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'

import { date } from '../../../../script/data'

import Regularization from '../../Components/Declarations/RegularizaçãoFundiaria'
import HeaderReport from '../../Components/HeaderReport'
import FooterReport from '../../Components/FooterReport'

import "../../Codem/global.css"

/*Para gerar a data e hora para numero único no relatorio */
var hour = moment().format('LTS').split(':')
var hourActualy = hour

var dataCod = date().split('/')


const spaceTop = {
    height: '112vh'
}


class DeclarationRequirement extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            dateResponse: "",
            historicSearch: [],
            search: [],
            dataStatusToday: ""
        }
    }

    paramId = () => {
        const { match: { params } } = this.props;
        return params.id
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HOST}/respostaPesquisa/${this.paramId()}`)
            .then(res => {
                const historicSearch = res.data
                this.setState({ historicSearch })

                var dataToday = date()
                const search = []
                var count = 0
                res.data.map((el, i) => {
                    if (el.dateResponse == dataToday) {
                        search[count] = el
                        count++
                    }
                })
                this.setState({ search })

                if (this.state.search.length <= 0) {
                    return
                }

                const title = this.state.search[0].title
                console.log(this.state.search)

                this.setState({ title })

                const dateResponse = this.state.search[0].dateResponse
                this.setState({ dateResponse })
            });
    }

    NodataToday = () => {
        return (
            <div>Não há registros para a data: {date()}</div>
        )
    }

    insertDoc = () => {
        var doc = dataCod[0] + dataCod[1] + dataCod[2] + hourActualy[0] + hourActualy[1]

        return doc
    }

    getDateSearch = (e) => {
        var dateInvert = e.target.value.split('-')
        var date = dateInvert[2] + "/" + dateInvert[1] + "/" + dateInvert[0]

        const search = []
        var count = 0
        this.state.historicSearch.map((el, i) => {
            if (el.dateResponse == date) {
                search[count] = el
                count++
            }
        })
        this.setState({ search })
    }

    render() {
        return (
            <div id="pageContainer">
                <div id="reportContainer">
                    <div id="dateFilter">Periodo: <input id="dateInput" type="date" name="dateSearch" onChange={e => this.getDateSearch(e)} /></div>
                    <div id="centralContainer">
                        {this.state.search.map((e, indexResearch) =>
                            <>
                                <HeaderReport
                                    title={this.state.title}
                                    numberDoc={this.insertDoc() + "-" + indexResearch}
                                />
                                <Regularization
                                    nomeCompleto={this.state.search[indexResearch].questions[1].query.response.res}
                                    nacionalidade={this.state.search[indexResearch].questions[3].query.response.res}
                                    estadoCivil={this.state.search[indexResearch].questions[35].query.response.res}
                                    profissaoOcupacao={this.state.search[indexResearch].questions[10].query.response.res}
                                    rg={this.state.search[indexResearch].questions[5].query.response.res}
                                    cpf={this.state.search[indexResearch].questions[2].query.response.res}

                                    nomeCompletoConjuge={this.state.search[indexResearch].questions[41].query.response.res}
                                    nacionalidadeConjuge={this.state.search[indexResearch].questions[43].query.response.res}
                                    estadoCivilConjuge={this.state.search[indexResearch].questions[35].query.response.res}
                                    profissaoOcupacaoConjuge={this.state.search[indexResearch].questions[47].query.response.res}
                                    rgConjuge={this.state.search[indexResearch].questions[45].query.response.res}
                                    cpfConjuge={this.state.search[indexResearch].questions[42].query.response.res}

                                    endereco={this.state.search[indexResearch].questions[29].query.response.res}
                                    numero={this.state.search[indexResearch].questions[30].query.response.res}
                                    bairro={this.state.search[indexResearch].questions[31].query.response.res}
                                    numeroSequencial={this.state.search[indexResearch].questions[25].query.response.res}
                                    confinateDireitoNumero={this.state.search[indexResearch].questions[26].query.response.res}
                                    confinateEsquerdoNumero={this.state.search[indexResearch].questions[27].query.response.res}
                                    confirmacao="NÃO"
                                    anosDePosse={this.state.search[indexResearch].questions[19].query.response.res}
                                    tipoOcupacao={this.state.search[indexResearch].questions[20].query.response.res}
                                    tipoDeUso={this.state.search[indexResearch].questions[22].query.response.res}
                                    tipoUsoPredominante={this.state.search[indexResearch].questions[23].query.response.res}
                                    rendaMensal={this.state.search[indexResearch].questions[17].query.response.res}

                                    data={this.state.dateResponse}
                                    signatureImg1={this.state.search[indexResearch].questions[63].query.response.res}
                                    signatureImg2={this.state.search[indexResearch].questions[64].query.response.res}

                                    phoneContact={this.state.search[indexResearch].questions[33].query.response.res}
                                />

                                <div style={spaceTop}></div>

                                <FooterReport dataFooter="CODEM – Av. Nazaré, nº 708- CEP: 66035-135 – Bairro: Nazaré."
                                    dataComplement="CNPJ: 04977583/0001-66. Belém-Pa. Telefone: 3084-0735/Fax: 3084-0700."
                                    cont={indexResearch + 1} total={this.state.search.length} cpf={this.state.search[indexResearch].questions[2].query.response.res} />

                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default DeclarationRequirement