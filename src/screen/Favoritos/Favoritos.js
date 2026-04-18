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

  //La idea es agarrar del localstorage todos los favoritos y meterlos en el state de este compoennte para ahi trabajarlos y renderizarlos
  //Como puede haber mas de un elementoo tenfo que hacer la cantidad de fetch dependiendo de la cantidad de objetos en el array favoritos. Recien una vez que ya se hayan hehco todos los fetch ahi si se guarda todo en el state
  componentDidMount() {
    const storage = localStorage.getItem("favoritos");

    if (storage !== null) {

      const favoritosGuardados = JSON.parse(storage);

      let resultados = [];
      let completados = 0;

      favoritosGuardados.map(fav => {
        fetch(`https://api.themoviedb.org/3/${fav.tipo}/${fav.id}?api_key=e9f925b12dca795f233417e113ec423a`)
          .then(res => res.json())
          .then(data => {
            resultados.push(data);
            completados = completados + 1;

            if (completados === favoritosGuardados.length) {
              this.setState({ favoritos: resultados });
            }
          })
          .catch(error => {
            console.log(error);
            completados = completados + 1;

            if (completados === favoritosGuardados.length) {
              this.setState({ favoritos: resultados });
            }
          });
      });
    }

    console.log(storage)
  }

  // Hago al funcion para eliminar de favoritos una pelicula
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
        <Header/>
        <div>
          <h2>Películas favoritas</h2>

          {peliculas.map(pelicula => (
          <DetalleCard 
              key={pelicula.id} 
              data={pelicula} 
              eliminar={() => this.eliminarFavorito(pelicula.id)} 
          />
          ))}

          <h2>Series favoritas</h2>

          {series.map(serie => (
          <DetalleCard 
              key={serie.id} 
              data={serie} 
              eliminar={() => this.eliminarFavorito(serie.id)} 
          />
          ))}
        </div>
      </>
    );
  }
}

export default Favoritos;