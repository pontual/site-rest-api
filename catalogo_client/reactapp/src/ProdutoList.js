import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { ClienteAuth } from './sitesecrets';

function ProdutoCard(props) {
    return (
        <div key={props.codigo}>
        {props.codigo} {props.descricao}
        </div>
    );
}


class ProdutoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
        };
    }

    render() {
        return (
            <div>
            {this.state.produtos.map((val, idx) => {
                return <ProdutoCard codigo={val.codigo} descricao={val.descricao} />
            })}
            </div>
        );
    }

    componentDidMount() {
        axios.get("http://pontualimportbrindes.com.br/api/produtos/", {auth: ClienteAuth})
             .then(res => {
                 const rows = res.data;
                 this.setState({ produtos: rows });
             });
    }

}

export default ProdutoList;
