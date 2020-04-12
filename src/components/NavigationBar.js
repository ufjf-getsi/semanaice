import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../css/side-menu.css';

var janela = window.matchMedia("(max-width: 48em)");

class NavigationBar extends Component {
    constructor() {
        super();
        janela.addListener(this.closeNavigation);
    }

    componentDidMount() {
        if (window.location.pathname === '/atividades' || window.location.pathname === '/') {
            document.getElementById("itemAtividades").style.background = "#d61f1f";
        } else if (window.location.pathname === '/palestrantes') {
            document.getElementById("itemPalestrantes").style.background = "#d61f1f";
        } else if (window.location.pathname === '/mapa') {
            document.getElementById("itemMapa").style.background = "#d61f1f";
        } else if (window.location.pathname === '/sobre') {
            document.getElementById("itemSobre").style.background = "#d61f1f";
        }
    }

    //Método para fechar a NavigationBar
    closeNavigation(janela) {
        if (janela.matches) {
            document.getElementById("menu").style.left = '0px';
            document.getElementById("background-NavBar").style.width = "0px";
        } else {
            document.getElementById("menu").style.left = '150px';
            document.getElementById("background-NavBar").style.width = "150px";
        }
    }

    //Método para abrir a NavigationBar
    openNavigation() {
        document.getElementById("menu").style.left = "150px";
        document.getElementById("background-NavBar").style.width = "100%";
    }

    //Método para estilização dos itens do menu
    mudaPagina(evento) {
        document.getElementById("itemAtividades").style.background = "#191818";
        document.getElementById("itemPalestrantes").style.background = "#191818";
        document.getElementById("itemMapa").style.background = "#191818";
        document.getElementById("itemSobre").style.background = "#191818";

        document.getElementById(evento.target.id).style.background = "#d61f1f";
    }

    render() {
        return (
            <div >
                <a onClick={this.openNavigation} id="menuLink" className="menu-link">

                    <span></span>
                </a>

                <div id="background-NavBar" onClick={() => this.closeNavigation(janela)} />

                <div id="menu">
                    <div className="pure-menu">
                        <div className="box-heading">
                            <button id="menu-close" onClick={() => this.closeNavigation(janela)}>X</button>
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
            </div>
        );
    }
}

export default NavigationBar;