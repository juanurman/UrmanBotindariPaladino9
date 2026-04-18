import React, { Component } from "react";
import DetalleCard from "../../components/DetalleCard/detalleCard.js";
import Header from "../../components/Header/Header";

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
      const favoritosGuardados = JSON.parse(storage);

      let resultados = [];
      let total = favoritosGuardados.length;
      //Hago un fetch por cada elemento en favoritos
      favoritosGuardados.map(favor => {
        fetch(`https://api.themoviedb.org/3/${favor.tipo}/${favor.id}?api_key=e9f925b12dca795f233417e113ec423a`)
          .then(res => res.json())
          .then(data => {
            resultados.push(data);

            // Cuando terminan todos los fetch
            if (resultados.length === total) {
              this.setState({ favoritos: resultados });
            }
          })
          .catch(error => console.log(error));
      });
    }

    console.log(storage);
  }

  eliminarFavorito(id) {
    let storage = localStorage.getItem("favoritos");
    let favoritos = storage !== null ? JSON.parse(storage) : [];

    let nuevos = favoritos.filter(i => i.id !== id);

    localStorage.setItem("favoritos", JSON.stringify(nuevos));

    let nuevosState = this.state.favoritos.filter(i => i.id !== id);
    this.setState({ favoritos: nuevosState });
  }

  render() {
    const peliculas = this.state.favoritos.filter(i => i.title);
    const series = this.state.favoritos.filter(i => i.name);

    return (
      <>
        <Header />
        <div>
          <h2>Películas favoritas</h2>

          {peliculas.map(pelicula => (
            <DetalleCard
              key={pelicula.id}
              data={pelicula}
              agregar={() => this.eliminarFavorito(pelicula.id)}
              textoBoton="Quitar de favoritos"
            />
          ))}

          <h2>Series favoritas</h2>

          {series.map(serie => (
            <DetalleCard
              key={serie.id}
              data={serie}
              agregar={() => this.eliminarFavorito(serie.id)}
              textoBoton="Quitar de favoritos"
            />
          ))}
        </div>
      </>
    );
  }
}

export default Favoritos;