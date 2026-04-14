import React from 'react';

//Este componente es para que cuando se toca ver detalle. Este es el componente hijo de la screen Detalle.
//Le paso como prop las props que traje del componente padre, la data ya filtrada y trabajada y la funcion agregar a favoritos
function DetalleCard(props) {

    //Le doy nombre de variable a la data que traigo del componente padre y a la funcion agregar a favoritos. 
    const data = props.data;
    const agregar = props.agregar;

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

            {/* Duracion (solo aparece en  peliculas) */}
            {data.runtime && <p>Duración: {data.runtime} min</p>}

            {/* Sinopsis, tanto pelicula como serie comparten el nombre en el obj literal */}
            <p>Sinopsis: {data.overview}</p>

            {/* Géneros, tambien comparten. Como a veces es mas de uno se juntan con el .join. */}
            <p>
                Genero/s: {data.genres.map(genero => genero.name).join(", ")}
            </p>

            <button onClick={agregar}>
                Agregar a favoritos
            </button> 
        </div>
    );
}

export default DetalleCard;