import React from 'react';
import logo from './logo.svg';
import './App.css';
import CategoriaList from './CategoriaList.js';
import Menu from './Menu.js';
import PersistentDrawerLeft from './ResponsiveDrawer.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoria: 0,
        }
    }
    
    handleClick(id) {
        console.log("handleClick on App " + id);
        this.setState({ categoria: id });
    }
    
    render() {
        return (
            <div className="App">
            <PersistentDrawerLeft categoria={this.state.categoria} onClick={(id) => this.handleClick(id)} />
            </div>
        );
    }
}

export default App;
