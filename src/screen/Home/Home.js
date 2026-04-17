import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import Search from "../../components/Search/Search";
import Peliculas from "../../components/Peliculas/Peliculas";
import Header from "../../components/Header/Header";

function Home () {
    return (
        <>
            <Header/>
            <Search />
            <Peliculas/>
        </>
    );
}

export default withRouter(Home);