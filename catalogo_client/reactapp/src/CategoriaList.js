import React from 'react';
import axios from 'axios';

import { ClienteAuth } from './sitesecrets.js';


class CategoriaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
        };
    }

    render() {
        return (
            <div>
            {this.props.categoria}
            {this.state.produtos.map((val, idx) => {
                return <div key={val.codigo}>{val.codigo} {val.descricao}</div>
            })}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        console.log("CategoriaList componentDidUpdate " + prevProps);
        if (prevProps.categoria !== this.props.categoria) {
            axios.get("http://pontualimportbrindes.com.br/api/categoria/" + this.props.categoria + "/", {auth: ClienteAuth})
                 .then(res => {
                     const rows = res.data;
                     this.setState({ produtos: rows });
                 });
        }
    }

}

export default CategoriaList;
