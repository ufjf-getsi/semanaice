import React, { Component } from 'react';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import PalestrantesList from './components/PalestrantesList';
import AtividadesList from './components/AtividadesList';
import Mapa from './components/Mapa';
import Sobre from './components/Sobre';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class App extends Component {

  /*componentDidMount () {
    if(window.location.pathname === "/" || window.location.pathname === "/atividades") {
      this.mudaPagina(document.getElementById("itemAtividades"));
    } else if(window.location.pathname === "/palestrantes") {
      console.log(true);
      this.mudaPagina(document.getElementById("itemPalestrantes"));
    } else if(window.location.pathname === "/mapa") {
      this.mudaPagina(document.getElementById("itemMapa"));
    } else if(window.location.pathname === "/sobre") {
      this.mudaPagina(document.getElementById("itemSobre"));
    }
  }*/


  /*componentDidMount () {
    const script = document.createElement("script");

    script.src = "./js/ui.js";
    script.async = true;

    document.body.appendChild(script);
  }*/

  mudaPagina(evento){
    console.log(evento);
    if(evento.target.id === "itemAtividades"){
      document.getElementById(evento.target.id).style.background = "#d61f1f";
      document.getElementById("itemPalestrantes").style.background = "#191818";
      document.getElementById("itemMapa").style.background = "#191818";
      document.getElementById("itemSobre").style.background = "#191818";
    } else if(evento.target.id === "itemPalestrantes"){
      document.getElementById(evento.target.id).style.background = "#d61f1f";
      document.getElementById("itemAtividades").style.background = "#191818";
      document.getElementById("itemMapa").style.background = "#191818";
      document.getElementById("itemSobre").style.background = "#191818";
    } else if(evento.target.id === "itemMapa") {
      document.getElementById(evento.target.id).style.background = "#d61f1f";
      document.getElementById("itemAtividades").style.background = "#191818";
      document.getElementById("itemPalestrantes").style.background = "#191818";
      document.getElementById("itemSobre").style.background = "#191818";
    } else if(evento.target.id === "itemSobre") {
      document.getElementById(evento.target.id).style.background = "#d61f1f";
      document.getElementById("itemAtividades").style.background = "#191818";
      document.getElementById("itemPalestrantes").style.background = "#191818";
      document.getElementById("itemMapa").style.background = "#191818";
    }
  }

  render() {
    return (

      <Router>
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <p className="pure-menu-heading">Menu</p>

            <ul className="pure-menu-list">
              <li className="pure-menu-item" ><Link to="/atividades" className="pure-menu-link" id="itemAtividades" onClick={this.mudaPagina} >Atividades</Link></li>
              <li className="pure-menu-item" ><Link to="/palestrantes" className="pure-menu-link" id="itemPalestrantes" onClick={this.mudaPagina} >Palestrantes</Link></li>

              <li className="pure-menu-item" ><Link to="/mapa" className="pure-menu-link" id="itemMapa" onClick={this.mudaPagina} >Mapa</Link></li>

              <li className="pure-menu-item" ><Link to="/sobre" className="pure-menu-link" id="itemSobre" onClick={this.mudaPagina} >Sobre</Link></li>
            </ul>
          </div>
        </div>

        
          <div id="main">
            <Switch>
              <Route path="/" exact component={AtividadesList} />
              <Route path="/atividades" component={AtividadesList} />
              <Route path="/palestrantes" component={PalestrantesList} />
              <Route path="/mapa" component={Mapa} />
              <Route path="/sobre" component={Sobre} />
            </Switch>
          </div>
        
      </div>
      </Router>
      
    );
  }
}

export default App;
