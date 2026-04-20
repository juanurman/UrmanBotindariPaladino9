import React from "react";
import Categoria from "../../components/Categoria/Categoria";
import Header from "../../components/Header/Header";

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
