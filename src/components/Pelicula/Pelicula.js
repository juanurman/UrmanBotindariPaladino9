import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";



class Pelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionadoId: null 
        };
    }

    verMas = (id) => {
        this.setState({
            seleccionadoId: this.state.seleccionadoId === id ? null : id
        });
    }

    render() {
        return (
            this.props.info.map((pelicula) => (
                <article className="single-card-movie" key={pelicula.id}>
                    
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} 
                        className="card-img-top" 
                        alt={pelicula.title} 
                    />
                    
                    <div className="cardBody">
                        <h5 className="card-title">{pelicula.title}</h5>
                        
                        <section className={this.state.seleccionadoId === pelicula.id ? "hide" : "block"}>
                            <p className="card-text">{pelicula.overview}</p>
                        </section>

                        <button className='btn btn-secondary' onClick={() => this.verMas(pelicula.id)}>
                            {this.state.seleccionadoId === pelicula.id ? "Ver descripción" : "Ocultar descripción"}
                        </button>
                        <Link to={`/detalle/peliculas/${pelicula.id}`} className="btn btn-primary">
                            Ver más
                        </Link>
                        {/* <a href="#" className="btn alert-primary">🩶</a> */}
                    </div>

                </article>
            ))
        );
    }
}

export default Pelicula;