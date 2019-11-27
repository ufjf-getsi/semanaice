import React, { Component } from 'react';
import SessionList from './components/sessionList';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {

  constructor(){
    super();
    this.state = {sessions : []}
  }

  /*componentDidMount () {
    const script = document.createElement("script");

    script.src = "./js/ui.js";
    script.async = true;

    document.body.appendChild(script);
  }*/

  render() {
    return (
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Menu</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Atividades</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Palestrantes</a></li>

              <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <a href="#" className="pure-menu-link">Mapa</a>
              </li>

              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Sobre</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <SessionList/>
        </div>
      </div>
      
    );
  }
}

export default App;
