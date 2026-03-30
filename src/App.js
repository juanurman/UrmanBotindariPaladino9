import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import {Switch, Route} from "react-router-dom"
import Home from "./screen/Home/Home.js"
import NotFound from "./screen/NotFound/notFound.js"
import Detalle from "./screen/Detalle/detalle.js";


function App() {
  return (
    <div>
      <div className="container">
      <Header/>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/detalle/:tipo/:id" component={Detalle} />
        <Route path="" component={NotFound}/>

      </Switch>
      </div>
      <Footer/> 
    </div>
  );
}


export default App;
