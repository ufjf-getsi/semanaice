import React, { Component } from 'react';
import SessionList from './components/sessionList';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import PalestranteList from './components/palestrantelist';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import sessionList from './components/sessionList';

class App extends Component {


  /*componentDidMount () {
    const script = document.createElement("script");

    script.src = "./js/ui.js";
    script.async = true;

    document.body.appendChild(script);
  }*/

  render() {
    return (

      <Router>
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Menu</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><Link to="/atividades" className="pure-menu-link">Atividades</Link></li>
              <li className="pure-menu-item"><Link to="/palestrantes" className="pure-menu-link">Palestrantes</Link></li>

              <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <a href="#" className="pure-menu-link">Mapa</a>
              </li>

              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Sobre</a></li>
            </ul>
          </div>
        </div>

        
          <div id="main">
            <Switch>
              <Route path="/" exact component={sessionList} />
              <Route path="/atividades" component={sessionList} />
              <Route path="/palestrantes" component={PalestranteList} />
            </Switch>
          </div>
        
      </div>
      </Router>
      
    );
  }
}

export default App;
