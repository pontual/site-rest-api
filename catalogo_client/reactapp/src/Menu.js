import React from 'react';
import axios from 'axios';

import { ClienteAuth } from './sitesecrets';


function MenuLink(props) {
    return (
        <button onClick={props.onClick}>
        {props.nome}
        </button>
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
