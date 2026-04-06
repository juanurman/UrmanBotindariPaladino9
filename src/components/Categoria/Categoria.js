import React, { Component } from "react";
import Pelicula from "../Pelicula/Pelicula"; 
import Loader from "../Loader/loader";


class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            primeraPagina: 1
        };
    }

    urls = {
        Populares: "https://api.themoviedb.org/3/movie/popular?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",

        Cartelera: "https://api.themoviedb.org/3/movie/now_playing?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",

        Movies: "https://api.themoviedb.org/3/trending/movie/day?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",

        Series: "https://api.themoviedb.org/3/tv/popular?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US"
    }
    componentDidMount() {
        const urlBase = this.urls[this.props.categoria];
        fetch(`${urlBase}&page=1`)
            .then(res => res.json())
            .then(data => this.setState({ peliculas: data.results }))
            .catch(err => console.log(err));
    }
    componentDidUpdate(props) {
        if (this.props.categoria !== props.categoria) {
            
            this.setState({ 
                peliculas: [], 
                primeraPagina: 1 
            }, () => {
                const urlBase = this.urls[this.props.categoria];
                
                fetch(`${urlBase}&page=1`)
                    .then(res => res.json())
                    .then(data => this.setState({ peliculas: data.results }))
                    .catch(err => console.log(err));
            });
        }}
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
                    {this.props.categoria}
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