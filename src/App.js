import Footer from "./components/Footer/Footer.js";
import {Switch, Route} from "react-router-dom"
import Home from "./screen/Home/Home.js"
import NotFound from "./screen/NotFound/notFound.js"
import Detalle from "./screen/Detalle/detalle.js";
import Favoritos from "./screen/Favoritos/Favoritos.js";
import Registro from "./screen/Registro/Registro.js";
import Categorias from "./screen/Categorias/Categorias.js";
import Results from "./components/Results/Results.js";
import Login from "./screen/Login/Login.js";


function App() {
  return (
    <div>
      <div className="container">
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/detalle/:tipo/:id" component={Detalle} />
        <Route path="/favoritos" component={Favoritos} />
        <Route path="/registro" component={Registro}/>
        <Route path="/login" component={Login}/>
        <Route path="/categoria/:categoria" component={Categorias} />
        <Route path="/Results/:tipo/:busqueda" component={Results} />
        <Route path="" component={NotFound}/>
      </Switch>
      </div>
      <Footer/> 
    </div>
  );
}


export default App;
