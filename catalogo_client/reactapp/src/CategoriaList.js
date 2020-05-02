import React from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

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
            <Box justifyContent="center" alignItems="center">
            <Grid container spacing={2}>

            {this.state.produtos.map((val, idx) => {
                return (
                    <Grid item key={val.codigo}>
                    <img src={"/thumbs/" + val.codigo + "_" + val.atualizado + "_thumb.jpg"} alt={val.codigo} />
                    </Grid>
                )
            })}
            </Grid>
            </Box>
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
