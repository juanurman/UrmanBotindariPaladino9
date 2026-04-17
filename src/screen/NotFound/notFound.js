import React from "react";
import Header from "../../components/Header/Header";
//Cuando ninguna route se cumple, el switch genera que nos lleve a 404 not found. 

function NotFound(){
    return(
        <>
            <Header/>
            <h1>404 Not Found</h1>
        </>
    )
}

export default NotFound

