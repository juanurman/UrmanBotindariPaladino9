import React, { Component } from "react";
import Pelicula from "../Pelicula/Pelicula";
import Loader from "../Loader/loader";

class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            primeraPagina: 1,
            value: ""
        };
    }

    urls = {
        Populares: "https://api.themoviedb.org/3/movie/popular?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",
        Cartelera: "https://api.themoviedb.org/3/movie/now_playing?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",
        Movies: "https://api.themoviedb.org/3/trending/movie/day?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",
        TV: "https://api.themoviedb.org/3/tv/popular?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US"
    }

    obtenerUrl(pagina) {
        const urlBase = this.urls[this.props.categoria];
        return `${urlBase}&page=${pagina}`;
    }

    componentDidMount() {
        const urlBase = this.urls[this.props.categoria];
        console.log(urlBase)
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
        }
        console.log(this.state.peliculas)
    }

    cargarMas = () => {
        const proximaPagina = this.state.primeraPagina + 1;

        fetch(this.obtenerUrl(proximaPagina))
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculas: this.state.peliculas.concat(data.results),
                    primeraPagina: proximaPagina
                });
            })
            .catch(error => console.log(error));
    }

    controlCambios(e){
        this.setState({
            value: e.target.value
        })
    }

    render() {
        let peliculasFiltradas = this.state.peliculas.filter(peli => {
            const tituloSeguro = peli.title || peli.name || "";

            return tituloSeguro.toLowerCase().includes(this.state.value.toLowerCase());
        });

        return (
            <main>
                <form className="form">
                    <label className="label-filtrar">
                        Filtrar pelicula : </label>
                    <input type="text" onChange={(e)=> this.controlCambios(e)} value={this.state.value}/>
                </form>

                <h2 className="alert alert-primary">
                    {this.props.categoria}
                </h2>

                <section className="row cards all-movies">
                    {
                        this.state.peliculas.length === 0 ? (
                            <Loader/>
                        ) : (
                            <Pelicula info={peliculasFiltradas} />
                        )
                    }
                </section>

                <button className="btn btn-info mt-3" onClick={this.cargarMas}>
                    Cargar más
                </button>
            </main>
        );
    }
}

export default Categoria;
