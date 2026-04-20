import React, { Component } from 'react';
import Cookies from "universal-cookie";

class DetalleCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            favoritos: []
        }
    }

    componentDidMount(){
        let favoritosGuardados = localStorage.getItem("favoritos");
        let listaFavoritos = favoritosGuardados !== null ? JSON.parse(favoritosGuardados) : [];
        this.setState({ favoritos: listaFavoritos });
    }

    manejarClick() {
        const data = this.props.data;

        let storage = localStorage.getItem("favoritos");
        let favoritos = storage !== null ? JSON.parse(storage) : [];

        let listaIds = favoritos.map(fav => fav.id);
        let estaEnFavoritos = listaIds.includes(data.id);

        if (estaEnFavoritos) {
            let nuevos = favoritos.filter(fav => fav.id !== data.id);
            localStorage.setItem("favoritos", JSON.stringify(nuevos));
            this.setState({ favoritos: nuevos });

            if (this.props.eliminar) {
                this.props.eliminar();
            }

        } else {
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

        const data = this.props.data;

        let listaIds = this.state.favoritos.map(fav => fav.id);
        let estaEnFavoritos = listaIds.includes(data.id);

        return (
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                    alt={data.title || data.name}
                />

                <h2>Titulo: {data.title || data.name}</h2>

                <p>Rating: {data.vote_average}</p>

                <p>Fecha estreno: {data.release_date || data.first_air_date}</p>

                {data.runtime && <p>Duración: {data.runtime} min</p>}

                <p>Sinopsis: {data.overview}</p>

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
