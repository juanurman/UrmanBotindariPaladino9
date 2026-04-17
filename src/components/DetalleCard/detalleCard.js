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
        // ejecuto la función que viene del padre
        this.props.agregar();

        // vuelvo a leer storage
        let favoritosGuardados = localStorage.getItem("favoritos");
        let listaFavoritos = favoritosGuardados !== null ? JSON.parse(favoritosGuardados) : [];

        // actualizo state, esto vuelve a renderiar
        this.setState({ favoritos: listaFavoritos });
    }

    render() {

        const cookies = new Cookies();
        let usuario = cookies.get("usuario");

        //La data viene como prop de la screen detalle.js. 
        const data = this.props.data;

        //MISMA LOGICA QUE EN PELICULA
        //En listaId guarda los id de las peliculas favoritas que estan en el state
        //El esta en favoritos es un booleano que chequea que en la listaIs este el id. Sirve para el ternario del boton
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

                {/* MISMO if QUE EN PELICULA */}
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