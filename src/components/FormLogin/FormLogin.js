import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

//El componente login es un componente con estado. En el estado estan las variables email, password y error (En error se va a guardar si llega a no cumplirse un requisito del login, despues se renderixa el propbema para que lo vea el usuario)
class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    //Es el elemento que disparó el evento (el input). De ahí sacás value (lo que el usuario escribe) y name (qué campo es), para actualizar el estado.
    cambios(e){
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    //Primero hace e.preventDefault() para que el formulario no se recargue al enviarse. Después busca los usuarios guardados en localStorage y los convierte de JSON a array. Si no hay nada guardado, usa un array vacío. Luego toma el email y password del estado y recorre los usuarios para ver si alguno coincide.

    //Validación y resultado
    //SSi no encuentra usuario, muestra error. Si lo encuentra, crea una cookie con cookies.set("usuario", email): esto sirve para guardar que el usuario está logueado (persistir la sesión, incluso si recarga la página). Luego redirige a la home con this.props.history.push("/").
    evitarsubmit(e){
            
        e.preventDefault()

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) 
        
        if(usuarios ===  null){
            usuarios = []
        }
        let email = this.state.email
        let password = this.state.password

        let usuarioEncontrado = null

        for(let i = 0; i < usuarios.length; i++){
            if(usuarios[i].email === email && usuarios[i].password === password){
                usuarioEncontrado = usuarios[i]
            }
        }

    if(usuarioEncontrado === null){
        this.setState({ error: "Credenciales incorrectas" })
    } else {
        const cookies = new Cookies()
        cookies.set("usuario", email)
        this.props.history.push("/")
    }
}


    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={(e) => this.evitarsubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Ingresá tu email"
                                value={this.state.email}
                                onChange={(e) => this.cambios(e)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Ingresá tu contraseña"
                                value={this.state.password}
                                onChange={(e) => this.cambios(e)}
                            />
                        </div>

                        
                        {this.state.error !== "" ? (<p className="text-danger">{this.state.error}</p>) : null}

                        <button type="submit" className="btn btn-primary btn-block">
                            Login
                        </button>
                    </form>

                    <p className="mt-3 text-center">
                        ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(FormLogin);
//Le agrega a tu componente props de navegación como history, que usás para redirigir con this.props.history.push("/").