import React, { Component } from "react";
import Loader from "../../components/Loader/loader.js"

//Ese es un componente el cual toma como prop un id el cual saca con const id = this.props.match.params.id; cuando se monta el componente.
//Cuando tiene el id, me meto directo en la API de ese Id (CON EL API KEY QUE ES LA CONTRA) y la info la guardo en el estado.

//Luego con un if comparo si hay algo en el estado, si no hay es porque no hay un personaje en la API con ese id
//Si si hay algo, se guarda en el estado y lo renderizzo.

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    const tipo = this.props.match.params.tipo;
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=e9f925b12dca795f233417e113ec423a`)
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(error => console.log(error));
  }



  //Los || es un or, se muestra o uno o el otro, dependiendo lo que corresponda si es serie o pelicula. 
  render() {
    if (!this.state.data) {
      return <Loader />;
    }

    const data = this.state.data;

    return (
      <div>
        {/* Imagen, serie y pelicula comparten nombre en el obj literal*/}
        <img
          src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
          alt={data.title || data.name} 
        />

        {/* Título, title es de pelicula, name es de serie*/}
        <h2>Titulo: {data.title || data.name}</h2>

        {/* Rating, como en la imagen comparten nombre en el obj literal de la API */}
        <p>Rating: {data.vote_average}</p>

        {/* Fecha, release_date es de pelciulaas. first_air_date es de serie */}
        <p>Fecha estreno: {data.release_date || data.first_air_date}</p>

        {/* Duración (solo aparece en  películas) */}
        {data.runtime && <p>Duración: {data.runtime} min</p>}

        {/* Sinopsis, tanto pelicula como serie comparten el nombre en el obj literal */}
        <p>Sinopsis: {data.overview}</p>

        {/* Géneros, tambien comparten. Como a veces es mas de uno se juntan con el .join. */}
        <p>
            Genero/s: {data.genres.map(genero => genero.name).join(", ")}
        </p>

        <button>Agregar a favoritos</button>
      </div>
    );
  }
}

export default Detalle;