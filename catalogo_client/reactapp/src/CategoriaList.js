import React from 'react';
import axios from 'axios';

import { ClienteAuth } from './sitesecrets.js';


class CategoriaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
            firstTime: true,
        };
    }

    render() {
        return (
            <div>
            { this.state.firstTime ? "Escolha uma categoria à esquerda" : "" }

            {this.state.produtos.map((val, idx) => {
                return <div key={val.codigo}>{val.codigo} {val.descricao}</div>
            })}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.categoria !== this.props.categoria) {
            axios.get("http://pontualimportbrindes.com.br/api/categoria/" + this.props.categoria + "/", {auth: ClienteAuth})
                 .then(res => {
                     const rows = res.data;
                     this.setState({ firstTime: false });
                     this.setState({ produtos: rows });
                     this.props.doneLoading();
                 });
        }
    }

}

export default CategoriaList;
