import React, { Component } from 'react'

import moment from 'moment'
import axios from 'axios'

import { date } from '../../../script/data'

import ContainerReport from '../Components/ContainerReport'
import PhotoReport from '../Components/PhotoReport'
import Signature from '../Components/Signature'
import FooterReport from '../Components/FooterReport'
import DataReport from '../Components/DataReport'

import HeaderReport from '../Components/HeaderReport'
import "../Codem/global.css"
import "./index.css"

/*Para gerar a data e hora para numero único no relatorio */
var hour = moment().format('LTS').split(':')
var hourActualy = hour


const spaceTop = {
    height: '70vh'
}


var dataCod = date().split('/')

class EngineeringReport extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            dateResponse: "",
            historicSearch: [],
            search: []
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

    insertDoc = () => {
        var doc = dataCod[0] + dataCod[1] + dataCod[2] + hourActualy[0] + hourActualy[1]

        return doc
    }

    renderData = (data, i) => {
        if (data.query.response.type === "croqui") {
            return
        } else if (data.query.response.type === "image") {
            return
        } else if (i < 9) {
            return (<DataReport
                titleQuestion={data.query.title}
                response={data.query.response.res}
            />)
        }
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


    renderReportPage = () => {
        return this.state.search.map((e, i) =>
            <>
                <HeaderReport
                    title={this.state.title}
                    numberDoc={this.insertDoc() + "-" + i}
                />
                <ContainerReport titleContainer="DADOS DO QUESTIONÁRIO" city="Belém" Uf="PA" date={e.dateResponse}>
                    <div id="containerReport">
                        <div id="containerDataEngineering">
                            {e.questions.map((el, index) =>
                                <>
                                    {this.renderData(el, index)}
                                </>
                            )}
                            <DataReport
                                titleQuestion="Latitude"
                                response={this.state.search[i].coordinates[0]}
                            />
                            <DataReport
                                titleQuestion="Longitude"
                                response={this.state.search[i].coordinates[1]}
                            />
                        </div>
                        <div id="containerPhoto">
                            <PhotoReport img={e.questions[3].query.response.res} />
                            <PhotoReport img={e.questions[8].query.response.res} />
                        </div>
                    </div>
                </ContainerReport>

                <Signature signatureImg={e.questions[9].query.response.res} />

                <div style={spaceTop}></div>

                <FooterReport dataFooter="CODEM – Av. Nazaré, nº 708- CEP: 66035-135 – Bairro: Nazaré."
                    dataComplement="CNPJ: 04977583/0001-66. Belém-Pa. Telefone: 3084-0735/Fax: 3084-0700."
                    cont={i + 1} total={this.state.search.length} cpf={this.state.search[i].questions[1].query.response.res} />
            </>
        )

    }

    render() {
        return (
            <div id="pageContainer">
                <div id="reportContainer">
                    <div id="dateFilter">Periodo: <input id="dateInput" type="date" name="dateSearch" onChange={e => this.getDateSearch(e)} /></div>
                    <div id="centralContainer">
                        {this.renderReportPage()}
                    </div>
                </div>
            </div>
        )
    }
}

export default EngineeringReport