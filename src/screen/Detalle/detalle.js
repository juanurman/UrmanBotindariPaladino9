import React, { Component } from "react";
import Loader from "../../components/Loader/loader.js"

//Ese es un componente el cual toma como prop un id el cual saca con const id = this.props.match.params.id; cuando se monta el componente.
//Cuando tiene el id, me meto directo en la API de ese Id y la info la guardo en el estado.

//Luego con un if comparo si hay algo en el estado, si no hay es porque no hay un personaje en la API con ese id
//Si si hay algo, se guarda en el estado y con cada cosa genero lo que se va a ver. 

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e9f925b12dca795f233417e113ec423a`)
      .then(res => res.json())
      .then(data => this.setState({ pelicula: data }))
      .catch(error => console.log(error));
  }

  render() {
    if (!this.state.pelicula) {
      return <Loader />;
    }

    const peli = this.state.pelicula;

    return (
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w342${peli.poster_path}`}
          alt={peli.title}
        />

        <h2>{peli.title}</h2>

        <p>Rating: {peli.vote_average}</p>

        <p>Fecha: {peli.release_date}</p>

        <p>Duración: {peli.runtime} minutos</p>

        <p>{peli.overview}</p>

        <p>
          Géneros: {peli.genres.map(g => g.name).join(", ")}
        </p>

        <button>Agregar a favoritos</button>
      </div>
    );
  }
}

export default Detalle;