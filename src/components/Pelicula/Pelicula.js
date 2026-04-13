import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

class Pelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descripcion: [],
            seleccionadoId: null
        };
    }
    componentDidMount(){
        let infoModificada = this.props.info.map(peli => {
            // Le "enchufamos" la propiedad nueva directamente al objeto
            peli.verDescripcion = false; 
            
            // Devolvemos la película ya modificada
            return peli; 
        });
        this.setState({ peliculas: infoModificada });
        }
    
    // se ejecuta cuando hacés click en el botón
    verMas(id) {
       let infoCambiada = this.state.peliculas.map(peli => {
            if (peli.id === id) {
                // Invertimos el valor directamente usando el punto
                peli.verDescripcion = !peli.verDescripcion; 
            }
            return peli;
        });

        this.setState({ peliculas: infoCambiada });
    }

    render() {
        return (
            // recorre el array de películas que viene por props. Viene del componente padre Peliculas.js
            this.props.info.map((pelicula) => {
                const tipo = pelicula.title ? "movie" : "tv";

                return(
                    <article className="single-card-movie" key={pelicula.id}>
                        
                        {/* imagen de la película */}
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} 
                            className="card-img-top" 
                            alt={pelicula.title} 
                        />
                        
                        <div className="cardBody">
                            {/* título */}
                            <h5 className="card-title">{pelicula.title}</h5>
                            
                            {/* descripción: se muestra o se oculta según el state */}
                            <section className={this.state.seleccionadoId === pelicula.id ? "hide" : "block"}>
                                <p className="card-text">{pelicula.overview}</p>
                            </section>

                            {/* botón para mostrar/ocultar descripción */}
                            <button 
                                className='btn btn-secondary' 
                                onClick={() => this.verMas(pelicula.id)}
                            >
                                {/* cambia el texto según si está abierta o cerrada */}
                                {this.state.seleccionadoId === pelicula.id 
                                    ? "Ver descripción" 
                                    : "Ocultar descripción"}
                            </button>

                            {/* link para ir al detalle de la película */}
                            <Link to={`/detalle/${tipo}/${pelicula.id}`} className="btn btn-primary">
                                Ver más
                            </Link>

                            {/* botón opcional (comentado) */}
                            {/* <a href="#" className="btn alert-primary">🩶</a> */}
                        </div>

                    </article>
            )})
        );
    }
}

export default Pelicula;