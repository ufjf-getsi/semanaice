import React, { Component } from 'react';
import '../css/sessionList.css';

class sessionList extends Component{

    selecionaTipo(evento){
        console.log(evento.target.id);
        if(evento.target.id == "tipoTodos"){
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoFavoritos").style.borderBottom = "1px solid #8f1616";
        } else {
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoTodos").style.borderBottom = "1px solid #8f1616";
        }
    }

    render(){
        return (
            <div id="sessionList">
                <div className="header">
                    <h1 className="titleSession">Atividades</h1>
                    <ul className="listaTipos">
                        <li className="tipos" id="tipoTodos" onClick={this.selecionaTipo}>TODOS</li>
                        <li className="tipos" id="tipoFavoritos" onClick={this.selecionaTipo}>FAVORITOS</li>
                    </ul>
                </div>

                <div className="content">
                    
                </div>
            </div>
        );
    }
}

export default sessionList;