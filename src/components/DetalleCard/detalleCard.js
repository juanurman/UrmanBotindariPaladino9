import React, { Component } from 'react';
import Cookies from "universal-cookie";

//Este componente es para que cuando se toca ver detalle. Este es el componente hijo de la screen Detalle.
//Le paso como prop las props que traje del componente padre, la data ya filtrada y trabajada y la funcion agregar a favoritos
class DetalleCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            favoritos: []
        }
    }

    componentDidMount(){
        // Traigo favoritos del storage
        let favoritosGuardados = localStorage.getItem("favoritos");

        // Si no hay nada, array vacío
        let listaFavoritos = favoritosGuardados !== null ? JSON.parse(favoritosGuardados) : [];

        this.setState({ favoritos: listaFavoritos });
    }

    // cuando clickeo el boton
    manejarClick() {

        const data = this.props.data;

        // Traigo favoritos del storage
        let storage = localStorage.getItem("favoritos");
        let favoritos = storage !== null ? JSON.parse(storage) : [];

        // Armo un array solo de ids
        let listaIds = favoritos.map(fav => fav.id);

        // Chequeo si ya está
        let estaEnFavoritos = listaIds.includes(data.id);

        if (estaEnFavoritos) {
            // eliminar
            let nuevos = favoritos.filter(fav => fav.id !== data.id);
            localStorage.setItem("favoritos", JSON.stringify(nuevos));
            this.setState({ favoritos: nuevos });

            // Aviso al padre (pantalla Favoritos)
            if (this.props.eliminar) {
                this.props.eliminar();
            }

        } else {
            // agregar
            favoritos.push({
                id: data.id,
                tipo: data.title ? "movie" : "tv"
            });

            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            this.setState({ favoritos: favoritos });
        }
    }

    render() {

        const cookies = new Cookies();
        let usuario = cookies.get("usuario");

        //La data viene como prop de la screen detalle.js. 
        const data = this.props.data;

        //MISMA LOGICA QUE EN PELICULA
        let listaIds = this.state.favoritos.map(fav => fav.id);
        let estaEnFavoritos = listaIds.includes(data.id);

        return (
            <div>
                {/* Imagen */}
                <img
                    src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                    alt={data.title || data.name} 
                />

                {/* Titulo */}
                <h2>Titulo: {data.title || data.name}</h2>

                {/* Rating */}
                <p>Rating: {data.vote_average}</p>

                {/* Fecha */}
                <p>Fecha estreno: {data.release_date || data.first_air_date}</p>

                {/* Duracion */}
                {data.runtime && <p>Duración: {data.runtime} min</p>}

                {/* Sinopsis */}
                <p>Sinopsis: {data.overview}</p>

                {/* Géneros */}
                <p>
                    Genero/s: {data.genres.map(genero => genero.name).join(", ")}
                </p>

                {
                    usuario !== undefined ?
                    <button onClick={() => this.manejarClick()}>
                        {estaEnFavoritos ? "Quitar de favoritos" : "Agregar a favoritos"}
                    </button>
                    :
                    ""
                }

            </div>
        );
    }
}

export default DetalleCard;