import React from "react";
import FormRegistro from "../../components/FormRegistro/FormRegistro";
import Header from "../../components/Header/Header";

function Registro(){
    return(
        <>
        <Header/>
        <div>
            <h2 className="alert alert-primary">Registro</h2>
            <FormRegistro/>
        </div>
        </>
    )
}

export default Registro
