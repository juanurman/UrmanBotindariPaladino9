import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Cookies from "universal-cookie"

class Pelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionadoId: null,
            usuario: undefined,
            favoritos: []
        };
    }

    componentDidMount(){
        let infoModificada = this.props.info.map(peli => {
            peli.verDescripcion = false;
            return peli;
        });

        let favoritos = localStorage.getItem("favoritos");
        if (favoritos === null) {
            favoritos = [];
        } else {
            favoritos = JSON.parse(favoritos);
        }

        this.setState({
            peliculas: infoModificada,
            favoritos: favoritos
        });
    }

    componentDidUpdate(props) {
        if (this.props.info !== props.info) {
           let infoModificada = this.props.info.map(peli => {
                peli.verDescripcion = false;
                return peli;
            });
            this.setState({
                peliculas: infoModificada,
            });
        }
        console.log(this.peliculas)
    }

    verMas(id) {
       let infoCambiada = this.state.peliculas.map(peli => {
            if (peli.id === id) {
                peli.verDescripcion = !peli.verDescripcion;
            }
            return peli;
        });
        this.setState({ peliculas: infoCambiada });
    };

    agregarFavorito(pelicula) {
        let favoritosGuardados = localStorage.getItem("favoritos");
        let listaFavoritos = JSON.parse(favoritosGuardados);

        const nuevaPelicula = {
            id: pelicula.id,
            tipo: pelicula.title ? "movie" : "tv",
            titulo: pelicula.title || pelicula.name
        };

        let listaId = listaFavoritos.map(fav => fav.id);

        listaFavoritos = listaId.includes(pelicula.id)
            ? listaFavoritos.filter(fav => fav.id !== pelicula.id)
            : listaFavoritos.concat(nuevaPelicula);

        localStorage.setItem("favoritos", JSON.stringify(listaFavoritos));
        this.setState({ favoritos: listaFavoritos });
    }

    render() {
        const cookies = new Cookies()
        let usuario = cookies.get("usuario");

        return (
            this.props.info.map((pelicula) => {
                const tipo = pelicula.title ? "movie" : "tv";

                let listaDeIdsFavoritos = this.state.favoritos.map(fav => fav.id);
                let estaEnFavoritos = listaDeIdsFavoritos.includes(pelicula.id)

                return(
                    <article className="single-card-movie" key={pelicula.id}>

                        <img
                            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                            className="card-img-top"
                            alt={pelicula.title}
                        />

                        <div className="cardBody">
                            <h5 className="card-title">{pelicula.title}</h5>

                            <section className={pelicula.verDescripcion ? "block" : "hide"}>
                                <p className="card-text">{pelicula.overview}</p>
                            </section>

                            <button
                                className='btn btn-secondary'
                                onClick={() => this.verMas(pelicula.id)}
                            >
                                {pelicula.verDescripcion
                                    ? "Ocultar descripción"
                                    : "Ver descripción"}
                            </button>

                            <Link to={`/detalle/${tipo}/${pelicula.id}`} className="btn btn-primary">
                                Ver más
                            </Link>

                            {usuario !== undefined ?
                            <button onClick={() => this.agregarFavorito(pelicula)}>
                                    {estaEnFavoritos ? "Quitar de favoritos" : "Agregar a favoritos"}
                            </button>
                             :
                            ""
                            }
                        </div>

                    </article>
            )})
        );
    }
}

export default Pelicula;
