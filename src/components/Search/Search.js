import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    enviarCambios(e) {
        e.preventDefault();
        this.props.history.push("/Results/name/" + this.state.value);
    }

    controlCambios(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={(e) => this.enviarCambios(e)} className="search-form">
                <input 
                    type="text" 
                    onChange={(e) => this.controlCambios(e)} 
                    value={this.state.value}
                    className=""
                    name="searchData"
                />
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            </form>
        ); 
            }

}

export default withRouter(Search);