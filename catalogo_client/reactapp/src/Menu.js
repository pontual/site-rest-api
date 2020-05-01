import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { ClienteAuth } from './sitesecrets.js';


function MenuLink(props) {
    return (
        <a href="#" onClick={props.onClick}>
        {props.nome}
        </a>
    );
}


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
        };
    }

    renderLink(id, nome) {
        return (
            <MenuLink key={id} nome={nome} onClick={() => this.props.onClick(id) } />
        );
    }
    
    render() {
        return (
            <div>
            {this.state.categorias.map((val, idx) => {
                return this.renderLink(val.id, val.nome);
            })}
            </div>
        );
    }

    componentDidMount() {
        axios.get("http://pontualimportbrindes.com.br/api/menu/", {auth: ClienteAuth})
             .then(res => {
                 const rows = res.data;
                 this.setState({ categorias: rows });
             });
    }

}

export default Menu;