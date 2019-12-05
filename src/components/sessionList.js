import React, { Component } from 'react';
import Session from '../data/sessions';
import SessionListItem from './sessionListItem';
import '../css/sessionList.css';

class sessionList extends Component{

    constructor(){
        super();
        this.state = {sessions : Session};
    
        
    }

    selecionaTipo(evento){
        console.log(evento.target.id);
        if(evento.target.id == "tipoTodos-Session"){
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoFavoritos-Session").style.borderBottom = "1px solid #8f1616";
        } else {
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoTodos-Session").style.borderBottom = "1px solid #8f1616";
        }
    }

    render(){
        return (
            <div id="list-Session">
                <div className="header-Session">
                    <h1 className="title-Session">Atividades</h1>
                    <ul className="listaTipos-Session">
                        <li className="tipos-Session" id="tipoTodos-Session" onClick={this.selecionaTipo}>TODOS</li>
                        <li className="tipos-Session" id="tipoFavoritos-Session" onClick={this.selecionaTipo}>FAVORITOS</li>
                    </ul>
                </div>

                <div className="content-Session">
                    {this.state.sessions.map(function(item){
                        return (
                            <SessionListItem key={item.id} id={item.id} nome={item.name} dataInicio={item.dateTimeStart} dataFinal={item.dateTimeEnd} local={item.location}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default sessionList;