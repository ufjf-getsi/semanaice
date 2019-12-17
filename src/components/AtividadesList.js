import React, { Component } from 'react';
import Session from '../data/sessions';
import AtividadesListItem from './AtividadesListItem';
import '../css/AtividadesList.css';
import PubSub from 'pubsub-js';

class AtividadesList extends Component{

    constructor(){
        super();
        this.state = {atividades : Session, selecFav : false};
    
        
    }

    componentDidMount(){
        PubSub.subscribe('atualizaFavoritos', function(topico, novaLista){
            if(this.state.selecFav){
                this.setState({atividades : novaLista});
            }
        }.bind(this));
    }

    selecionaTipo(evento){
        if(evento.target.id === "tipoTodos-Atividades"){
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoFavoritos-Atividades").style.borderBottom = "1px solid #8f1616";

            this.setState({atividades : Session, selecFav : false});
        } else {
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoTodos-Atividades").style.borderBottom = "1px solid #8f1616";

            this.setState({atividades : JSON.parse(localStorage.getItem("favoritos")), selecFav : true});
        }
    }

    render(){
        return (
            <div id="list-Atividades">
                <div className="header-Atividades">
                    <h1 className="title-Atividades">Atividades</h1>
                    <ul className="listaTipos-Atividades">
                        <li className="tipos-Atividades" id="tipoTodos-Atividades" onClick={this.selecionaTipo.bind(this)}>TODOS</li>
                        <li className="tipos-Atividades" id="tipoFavoritos-Atividades" onClick={this.selecionaTipo.bind(this)}>FAVORITOS</li>
                    </ul>
                </div>

                <div className="content-Atividades">
                    {this.state.atividades.length > 0 ?
                    this.state.atividades.map(function(item){
                        var favoritos = JSON.parse(localStorage.getItem("favoritos"));
                        var existe = false;
                        if(favoritos != null) {
                            favoritos.map(function(fav){
                                if(item.id === fav.id){
                                    existe = true;
                                }
                                return(null);
                            })
                        }
                        if(!existe){
                            return (
                                <AtividadesListItem key={item.id} fav={false} id={item.id} nome={item.name} dataInicio={item.dateTimeStart} dataFinal={item.dateTimeEnd} local={item.location} atividade={item}/>
                            );
                        } else {
                            return (
                                <AtividadesListItem key={item.id} fav={true} id={item.id} nome={item.name} dataInicio={item.dateTimeStart} dataFinal={item.dateTimeEnd} local={item.location} atividade={item}/>
                            );
                        }
                    }) : (<p id="semAtividade">Nenhuma atividade encontrada!</p>)}
                </div>
            </div>
        );
    }
}

export default AtividadesList;