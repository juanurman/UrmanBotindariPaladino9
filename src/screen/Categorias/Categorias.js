import React from "react";
import Categoria from "../../components/Categoria/Categoria";
import Header from "../../components/Header/Header";

//Toma de la URL, el nombre de la categoria que se toco, esto lo puede hacer por la ruta. Eso que toma se lo manda como prop a su componente hijo Categoria.js
function Categorias(props) {
    const categoriaUrl = props.match.params.categoria;
    return (
        <>
            <Header/>
            <Categoria categoria={categoriaUrl}/>
        </>
    );
}

export default Categorias;