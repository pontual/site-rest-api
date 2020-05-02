import React from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ClienteAuth } from './sitesecrets.js';


class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
        };
    }

    renderLink(id, nome) {
        return (
            <ListItem button key={id} onClick={() => this.props.onClick(id, nome) }>
            <ListItemText primary={nome} />
            </ListItem>
        );
    }
    
    render() {
        return (
            <List>
            {this.state.categorias.map((val, index) => {
                return this.renderLink(val.id, val.nome);
            })}
            </List>
        );
    }

    componentDidMount() {
        axios.get("http://pontualimportbrindes.com.br/api/menu/", {auth: ClienteAuth})
             .then(res => {
                 const rows = res.data;
                 this.setState({ categorias: rows });
                 this.props.onLoad();
             });
    }

}

export default MenuList;
