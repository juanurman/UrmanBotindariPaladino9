import React, { Component } from "react";
import { Link } from "react-router-dom";

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: []
    };
  }

  componentDidMount() {
    const storage = localStorage.getItem("favoritos");

    if (storage !== null) {
      this.setState({ favoritos: JSON.parse(storage) });
    }
  }

  eliminarFavorito(id) {
    let nuevos = this.state.favoritos.filter(f => f.id !== id);

    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    this.setState({ favoritos: nuevos });
  }

  render() {
    const peliculas = this.state.favoritos.filter(f => f.tipo === "movie");
    const series = this.state.favoritos.filter(f => f.tipo === "tv");

    return (
      <div>
        <h2>Películas favoritas</h2>

        {peliculas.map(pelicula => (
          <div key={pelicula.id}>

            <h3>{pelicula.titulo}</h3>

            <Link to={`/detalle/movie/${pelicula.id}`}>
              Ver detalle
            </Link>

            <button onClick={() => this.eliminarFavorito(pelicula.id)}>
              Eliminar
            </button>
          </div>
        ))}

        <h2>Series favoritas</h2>

        {series.map(serie => (
          <div key={serie.id}>

            <h3>{serie.titulo}</h3>

            <Link to={`/detalle/tv/${serie.id}`}>
              Ver detalle
            </Link>

            <button onClick={() => this.eliminarFavorito(serie.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Favoritos;