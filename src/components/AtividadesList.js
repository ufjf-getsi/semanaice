import React, { Component } from 'react';
import Session from '../data/sessions';
import AtividadesListItem from './AtividadesListItem';
import '../css/AtividadesList.css';

class AtividadesList extends Component{

    constructor(){
        super();
        this.state = {atividades : Session};
    
        
    }

    selecionaTipo(evento){
        if(evento.target.id === "tipoTodos-Atividades"){
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoFavoritos-Atividades").style.borderBottom = "1px solid #8f1616";
        } else {
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoTodos-Atividades").style.borderBottom = "1px solid #8f1616";
        }
    }

    render(){
        return (
            <div id="list-Atividades">
                <div className="header-Atividades">
                    <h1 className="title-Atividades">Atividades</h1>
                    <ul className="listaTipos-Atividades">
                        <li className="tipos-Atividades" id="tipoTodos-Atividades" onClick={this.selecionaTipo}>TODOS</li>
                        <li className="tipos-Atividades" id="tipoFavoritos-Atividades" onClick={this.selecionaTipo}>FAVORITOS</li>
                    </ul>
                </div>

                <div className="content-Atividades">
                    {this.state.atividades.map(function(item){
                        return (
                            <AtividadesListItem key={item.id} id={item.id} nome={item.name} dataInicio={item.dateTimeStart} dataFinal={item.dateTimeEnd} local={item.location}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default AtividadesList;