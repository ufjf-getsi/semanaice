import React, { Component } from 'react';
import './App.css';
import './css/pure-min.css';
import NavigationBar from './components/NavigationBar';
import PalestrantesList from './components/PalestrantesList';
import AtividadesList from './components/AtividadesList';
import Mapa from './components/Mapa';
import Sobre from './components/Sobre';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {

  render() {
    return (

      <Router>
        <div id="layout">

          <NavigationBar />

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
