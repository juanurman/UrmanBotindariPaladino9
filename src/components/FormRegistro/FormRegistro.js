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



    // cambios(e) se ejecuta cuando el usuario escribe.
    // e.target.name = nombre del input (email)
    // e.target.value = es el valor que esta en el estdo
    // Actualiza el state usando el name como clave    
    cambios(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    //Sr crea la funvion eviatrsubmit.
    //Esta funcion cuando se llama evita que se mande el submit y se vuelva a renderizar toda la pagina. 
    //Se guardan los valores del estado en diferentes variables para poder evaluarlas posteriormente.

    //Dentro de la funcion hay un for, este recorre el state en email y si el email el cual se puso ya esta, le pone valor un mensaje a la variable error
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

    //Sie l largo del valor dentro de la variable password es menos a 6 caracteres, se pone en la variable error del estado, el mensaje indicando el error
    if(password.length < 6){
        this.setState({ error: "La contraseña debe tener al menos 6 caracteres" })
        return
    }


    //Una vez ya hechas todas las validaciones, se guarda el email y el ususario en una variable de usuario nuevo
    let nuevoUsuario = {
        email: email,
        password: password
    }

    //Le meto a la variable usuarios la variable usuarioNuevo con el push. 
    //Luego guardo la variable usuarios en el localStorage
    usuarios.push(nuevoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

    //El render lo que tiene dentro es todo lo que se renderiza en la screen, osea lo que se ve 
    //El render tiene todas las etiquetas especificas a la hora de hacer un form, label, input. El label dentro tiene el type que es email. 
    //esto se repite dos veces, una vez para el mail, otra para la contraseña. 
    //La etiqueta tiene el evento que cuando se clickea llama a la funcione evitarSubmit. 
    // name: indica qué propiedad del state se actualiza
    // value: muestra el valor guardado en el state (input controlado por React)
    //Esta onChange que cuando se cambia algo llama ala funcion cambios

    //Luego esta el this que es un if ternario. Se pregunta si esta vacio el estado en erorr, si no esta vacio, muetsra por pantalla el error sacandolo del state.
    //Pero si si esta vacio, no muestra nada. 

    //Debajo de todo esta el boton para registrarse. 
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













