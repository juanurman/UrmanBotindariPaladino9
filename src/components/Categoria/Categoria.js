import React, { Component } from "react";
import Pelicula from "../Pelicula/Pelicula"; 
import Loader from "../Loader/loader";


class Categoria extends Component {
    constructor() {
        super();
        this.state = {
            peliculas: [],
            primeraPagina: 1
        };
    }

    obtenerUrl = (pagina) => {
        const catego = this.props.categoria; 
        if (catego === "populares") {
            return `https://api.themoviedb.org/3/movie/popular?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US&page=${pagina}`;
        } else {
            return `https://api.themoviedb.org/3/discover/movie?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US&with_release_type=2%7C3&release_date.gte=2026-03-01&release_date.lte=2026-04-30&page=${pagina}`;
        }
    }

    componentDidMount() {
        fetch(this.obtenerUrl(this.state.primeraPagina))
            .then(response => response.json())
            .then(data => {
                this.setState({ peliculas: data.results });
            })
            .catch(error => console.log(error));
    }

    cargarMas = () => {
        const proximaPagina = this.state.primeraPagina + 1;
        
        fetch(this.obtenerUrl(proximaPagina))
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculas: this.state.peliculas.concat(data.results),
                    paginaActual: proximaPagina
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <main>
                <h2 className="alert alert-primary">
                    Todas las Películas {this.props.categoria === "populares" ? "Populares" : "en Cartelera"}
                </h2>

                <section className="row cards all-movies">
                    {this.state.peliculas.length === 0 ? (
                        <Loader/>
                    ) : (
                        <Pelicula info={this.state.peliculas} /> 
                    )}
                </section>

                <button className="btn btn-info mt-3" onClick={this.cargarMas}>
                    Cargar más
                </button>
            </main>
        );
    }
}

export default Categoria;