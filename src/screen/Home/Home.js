import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import Search from "../../components/Search/Search";
import Peliculas from "../../components/Peliculas/Peliculas";

function Home () {
    return (
        <>
            <Search />
            <Peliculas/>
        </>
    );
}

export default withRouter(Home);