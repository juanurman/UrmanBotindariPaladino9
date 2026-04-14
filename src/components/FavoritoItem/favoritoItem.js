import React from 'react';
import { Link } from 'react-router-dom';

//Este componente es el hijo de la screen favorito.
function FavoritoItem(props) {
    
    //Le doy nombre de variable aal item (Que trae cada item de favoritos) y nombre de variable a la funcion eliminar de favoritos
    //El item trae de Favoritos.js todo el item con la pelicula y su info.
    //El eliminar trae la funcion eliminar especifica para cada pelicula. La voy ausar en el boton "eliminar"
    const item = props.item;
    const eliminar = props.eliminar;


    return (
        <div key={item.id}>
            <h3>{item.titulo}</h3>

            <Link to={`/detalle/${item.tipo}/${item.id}`}>
                Ver detalle
            </Link>

            <button onClick={() => eliminar(item.id)}>
                Eliminar
            </button>
        </div>
    );
}

export default FavoritoItem;