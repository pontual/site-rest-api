import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import CategoriaList from './CategoriaList.js';
// import Menu from './Menu.js';
import PersistentDrawerLeft from './ResponsiveDrawer.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoria: 0,
            categoriaNome: "",
        }
    }
    
    handleClick(id, nome) {
        console.log("handleClick on App " + id + nome);
        if (id !== this.state.categoria) {
            this.setState({ categoria: id });
            this.setState({ categoriaNome: nome });
        }
    }
    
    render() {
        return (
            <div className="App">
            <PersistentDrawerLeft categoria={this.state.categoria} categoriaNome={this.state.categoriaNome} onClick={(id, nome) => this.handleClick(id, nome)} />
            </div>
        );
    }
}

export default App;
