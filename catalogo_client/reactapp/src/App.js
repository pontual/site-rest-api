import React from 'react';
import './App.css';
import PersistentDrawerLeft from './PersistentDrawerLeft';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriaId: 0,
            categoriaNome: "",
        }
    }
    
    handleClick(id, nome) {
        console.log("handleClick on App " + id + nome);
        if (id !== this.state.categoriaId) {
            this.setState({ categoriaId: id });
            this.setState({ categoriaNome: nome });
        }
    }
    
    render() {
        return (
            <div className="App">
            <PersistentDrawerLeft categoriaId={this.state.categoriaId} categoriaNome={this.state.categoriaNome} onClick={(id, nome) => this.handleClick(id, nome)} />
            </div>
        );
    }
}

export default App;
