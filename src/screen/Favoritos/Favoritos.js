import React, { Component } from "react";
import FavoritoItem from "../../components/FavoritoItem/favoritoItem.js";

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: []
    };
  }

  componentDidMount() {
    // Traigo lo que ya hay o nada de favoritos en el storage. 
    const storage = localStorage.getItem("favoritos");

    if (storage !== null) {

      // Si si hay algo, se guarda en el estado (como objeto literal con .parse) y lo renderizzo.
      this.setState({ favoritos: JSON.parse(storage) });
    }
  }

  // Hago al funcion para eliminar de favoritos una pelicula
  eliminarFavorito(id) {

    // Filtro el array para quedarme los que no coinciden con el id el cual quiero eliminar
    let nuevos = this.state.favoritos.filter(i => i.id !== id);

    // Guardo todo ya filtrado otra vez en el Storae para podes usarlo en otra sxreen. 
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    this.setState({ favoritos: nuevos });
  }

  render() {
    // Itero el estado y los que son tipo peliculas los meto en una variable, los tipos tv en otra. 
    //Estos despues los voy a iterar y renderizar pasando informacion a los componentes hijos.
    const peliculas = this.state.favoritos.filter(i => i.tipo === "movie");
    const series = this.state.favoritos.filter(i => i.tipo === "tv");

    return (
      <div>
        <h2>Películas favoritas</h2>

        {/* Mapeo la variable películas y le paso info al componente Favoritoitem. Tambien le paso la info del id a eliminar para el boton eliminar */}
        {peliculas.map(pelicula => (
            <FavoritoItem 
                key={pelicula.id} 
                item={pelicula} 
                eliminar={(id) => this.eliminarFavorito(id)} 
            />
        ))}

        <h2>Series favoritas</h2>

        {/* Mapeo la variable series y le paso la iformacion al componente FavoritoItem. Tambien le paso la info del id a eliminar para el boton eliminar */}
        {series.map(serie => (
            <FavoritoItem 
                key={serie.id} 
                item={serie} 
                eliminar={(id) => this.eliminarFavorito(id)} 
            />
        ))}
      </div>
    );
  }
}

export default Favoritos;