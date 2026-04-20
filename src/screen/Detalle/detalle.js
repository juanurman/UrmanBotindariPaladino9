import React, { Component } from "react";
import Loader from "../../components/Loader/loader.js";
import DetalleCard from "../../components/DetalleCard/detalleCard.js";
import Header from "../../components/Header/Header.js";

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const tipo = this.props.match.params.tipo;
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=e9f925b12dca795f233417e113ec423a`)
      .then(response => response.json())
      .then(data => this.setState({
        data: data,
        tipo:tipo
       }))
      .catch(error => console.log(error));
  }

  agregarFavorito() {
    let favoritos = localStorage.getItem("favoritos");

    if (favoritos === null) {
        favoritos = [];
    } else {
        favoritos = JSON.parse(favoritos);
    }

    favoritos.push({
        id: this.state.data.id,
        tipo: this.state.tipo,
        titulo: this.state.data.title || this.state.data.name
    });

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log(this.state.data.id, this.state.tipo, this.state.data.name)
  }

  render() {
    if (!this.state.data) {
      return <Loader />;
    }

    return (
      <>
        <Header/>
        <main>
          <DetalleCard
              data={this.state.data}
              agregar={() => this.agregarFavorito()}
              />
        </main>
      </>
    );
  }
}

export default Detalle;
