import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";


class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    cambios(e){
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

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