import React from 'react';
import { Link } from 'react-router-dom';

function FavoritoItem(props) {
    const { item, eliminar } = props;

    return (
        <div key={item.id} style={{ marginBottom: '20px' }}>
            <h3>{item.titulo}</h3>

            <Link to={`/detalle/${item.tipo}/${item.id}`}>
                Ver detalle
            </Link>

            <button onClick={() => eliminar(item.id)} style={{ marginLeft: '10px' }}>
                Eliminar
            </button>
        </div>
    );
}

export default FavoritoItem;