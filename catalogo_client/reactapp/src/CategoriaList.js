import React from 'react';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { ClienteAuth } from './sitesecrets';
import ProdutoCard from './ProdutoCard';


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
            <GridList cols={3}>
            { this.state.firstTime ? "Escolha uma categoria à esquerda" : "" }

            {this.state.produtos.map((val, idx) => {
                return (
                    <GridListTile key={val.codigo}>
                    <ProdutoCard codigo={val.codigo} />
                    </GridListTile>
                )
            })}
            </GridList>
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
