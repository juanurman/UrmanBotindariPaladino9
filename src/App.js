import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import {Switch, Route} from "react-router-dom"
import Home from "./screen/Home/Home.js"


function App() {
  return (
    <div>
      <div className="container">
      <Header/>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
      </Switch>
      </div>
      <Footer/> 
    </div>
  );
}


export default App;
