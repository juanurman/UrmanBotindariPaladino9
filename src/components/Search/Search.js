import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 



// 1. El usuario escribe en el input
// → se ejecuta controlCambios(e)
// → guarda lo escrito en this.state.value

// 2. El input muestra siempre lo que hay en el state
// → value={this.state.value}

// 3. El usuario envía el formulario (click en "Buscar" o Enter)
// → se ejecuta enviarCambios(e)

// 4. e.preventDefault()
// → evita que la página se recargue

// 5. this.props.history.push(...)
// → redirige a otra ruta usando el valor escrito
// Ej: /Results/name/hola

//Se arranca el componente search con un state con la propiedad value sin ningun valor.

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }


    //El enviarcambios es una funcion que cuando se llama, evita el comportamiento default y ademas con el push history, me lleva la nueva pagina.
    //El push va a llevarnos a la pagina donde este lo que se busco y guardo en el estado con la funcion controlCambios(e)
    enviarCambios(e) {
        e.preventDefault();
        this.props.history.push("/Results/name/" + this.state.value);
    }

    //Esta funcion lo que hace es que agarra el value de lo que se escribe en el input y lo guarda en el state. Este valor lo toma la funcion enviarCambios para llevarnos a la nueva pagina
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