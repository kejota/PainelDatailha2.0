import React, { Component } from 'react';
import MapContainer  from './mapContainer';
import axios from "axios"
class Map extends Component {

    constructor() {
        super()
        this.state = {
            search: [],
        }
    }
    paramId = () => {
        const { match: { params } } = this.props;
        return params.id
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HOST}/respostaPesquisa/${this.paramId()}`)
            .then(res => {
                const search = res.data
                this.setState({ search })
            });
    }

    render() {
        return (
            <MapContainer places={this.state.search} />
        );
    }

}

export default Map
