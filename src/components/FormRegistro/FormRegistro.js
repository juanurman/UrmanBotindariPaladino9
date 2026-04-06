import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

//El componente registro esta formado por un componente con estado. El cual comienza con las propiedades email, paswword y error, todas en null.
class FormRegistro extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

                                                        //?????
                                                        cambios(e){
                                                            this.setState({
                                                                [e.target.name]: e.target.value
                                                            })
                                                        }



                                                        
    evitarsubmit(e){
            
        e.preventDefault()

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
        let email = this.state.email
        let password = this.state.password

        for(let i = 0; i < usuarios.length; i++){
            if(usuarios[i].email === email){
                this.setState({ error: "El email ya está en uso" })
                return
        }
    }

    if(password.length < 6){
        this.setState({ error: "La contraseña debe tener al menos 6 caracteres" })
        return
    }

    let nuevoUsuario = {
        email: email,
        password: password
    }

    usuarios.push(nuevoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
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
                            Registrarse
                        </button>
                    </form>

                    <p className="mt-3 text-center">
                        ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(FormRegistro);