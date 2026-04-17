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
  componentDidMount() {
    // Traigo lo que ya hay o nada de favoritos en el storage. 
    const storage = localStorage.getItem("favoritos");

    if (storage !== null) {

      // Si si hay algo, lo parseo
      const favoritosGuardados = JSON.parse(storage);

      // Por cada favorito hago fetch a la API para tener la data completa
      Promise.all(
        favoritosGuardados.map(fav =>
          fetch(`https://api.themoviedb.org/3/${fav.tipo}/${fav.id}?api_key=e9f925b12dca795f233417e113ec423a`)
            .then(response => response.json())
        )
      )
      .then(data => {
        // Guardo toda la data completa en el estado
        this.setState({ favoritos: data });
      })
      .catch(error => console.log(error));
    }

    console.log(storage)
  }

  // Hago al funcion para eliminar de favoritos una pelicula
  eliminarFavorito(id) {

    // Traigo lo que hay en storage
    let storage = localStorage.getItem("favoritos");
    let favoritos = storage !== null ? JSON.parse(storage) : [];

    // Filtro el array para eliminar el id
    let nuevos = favoritos.filter(i => i.id !== id);

    // Guardo todo ya filtrado otra vez en el Storage para podes usarlo en otra screen. 
    localStorage.setItem("favoritos", JSON.stringify(nuevos));

    // También lo saco del estado para que se actualice la vista
    let nuevosState = this.state.favoritos.filter(i => i.id !== id);
    this.setState({ favoritos: nuevosState });
  }

  render() {
    // Itero el estado y los que son tipo peliculas los meto en una variable, los tipos tv en otra. 
    //Estos despues los voy a iterar y renderizar pasando informacion a los componentes hijos.
    const peliculas = this.state.favoritos.filter(i => i.title);
    const series = this.state.favoritos.filter(i => i.name);

    return (
      <>
        <Header/>
        <div>
          <h2>Películas favoritas</h2>

          {/* Mapeo la variable películas y le paso info al componente DetalleCard. Tambien le paso la info del id a eliminar para el boton */}
          {peliculas.map(pelicula => (
          <DetalleCard 
              key={pelicula.id} 
              data={pelicula} 
              agregar={() => this.eliminarFavorito(pelicula.id)} 
              textoBoton="Quitar de favoritos"
          />
          ))}

          <h2>Series favoritas</h2>

          {/* Mapeo la variable series y le paso la iformacion al componente DetalleCard. Tambien le paso la info del id a eliminar */}
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