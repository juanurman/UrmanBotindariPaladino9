import React from "react";
import Categoria from "../../components/Categoria/Categoria";

function Categorias(props) {
    const categoriaUrl = props.match.params.categoria;
    return (
        <Categoria categoria={categoriaUrl}/>
    );
}

export default Categorias;