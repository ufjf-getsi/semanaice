import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../css/side-menu.css';

var x = window.matchMedia("(max-width: 48em)");

class NavigationBar extends Component {
    constructor() {
        super();
        x.addListener(this.closeNavigation);
    }

    closeNavigation(x) {
        if (x.matches) {
            document.getElementById("menu").style.left = '0px';
        } else {
            document.getElementById("menu").style.left = '150px';
        }
    }



    openNavigation() {
        document.getElementById("menu").style.left = "150px";
    }

    mudaPagina(evento) {
        document.getElementById("itemAtividades").style.background = "#191818";
        document.getElementById("itemPalestrantes").style.background = "#191818";
        document.getElementById("itemMapa").style.background = "#191818";
        document.getElementById("itemSobre").style.background = "#191818";

        document.getElementById(evento.target.id).style.background = "#d61f1f";
    }

    render() {
        return (
            <>
                <a onClick={this.openNavigation} id="menuLink" className="menu-link">

                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <div className="box-heading">
                            <button id="menu-close" onClick={() => this.closeNavigation(x)}>X</button>
                            <p className="pure-menu-heading">Menu</p>
                        </div>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item" ><Link to="/atividades" className="pure-menu-link" id="itemAtividades" onClick={this.mudaPagina} >Atividades</Link></li>
                            <li className="pure-menu-item" ><Link to="/palestrantes" className="pure-menu-link" id="itemPalestrantes" onClick={this.mudaPagina} >Palestrantes</Link></li>

                            <li className="pure-menu-item" ><Link to="/mapa" className="pure-menu-link" id="itemMapa" onClick={this.mudaPagina} >Mapa</Link></li>

                            <li className="pure-menu-item" ><Link to="/sobre" className="pure-menu-link" id="itemSobre" onClick={this.mudaPagina} >Sobre</Link></li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default NavigationBar;