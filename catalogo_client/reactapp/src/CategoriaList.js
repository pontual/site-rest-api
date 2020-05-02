import React from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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

            <Typography variant="h6" noWrap>
            {this.props.categoriaNome}
            </Typography>
            
            <br />
            <br />
            <br />

            <Grid container spacing={2}>

            {this.state.produtos.map((val, idx) => {
                return (
                    <Grid item key={val.codigo}>
                    <ProdutoCard codigo={val.codigo} atualizado={val.atualizado} descricao={val.descricao} cv={val.cv} />
                    </Grid>
                )
            })}
            </Grid>
            </Box>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.categoriaId !== this.props.categoriaId) {
            axios.get("http://pontualimportbrindes.com.br/api/categoria/" + this.props.categoriaId + "/", {auth: ClienteAuth})
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
