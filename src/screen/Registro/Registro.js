import React from "react";
import FormRegistro from "../../components/FormRegistro/FormRegistro";

//La screen registro solo tiene un h2 que le da un titulo de con la palabra "registro"
//Tambien tiene como componente el formRegistro que es un componente en la arpeta FormRegistro
function Registro(){
    return(
        <div>
            <h2 className="alert alert-primary">Registro</h2>
            <FormRegistro/>
        </div> 
    )
}

export default Registro