import React, { Component } from 'react';
import Session from '../data/sessions';
import AtividadesListItem from './AtividadesListItem';
import '../css/AtividadesList.css';
import PubSub from 'pubsub-js';
import Popup from "reactjs-popup";

class AtividadesList extends Component{

    constructor(){
        super();
        this.state = {atividades : Session, selecFav : false, rotulos : [], filtrado : false, filtro : []};
    
        this.configuraFiltro = this.configuraFiltro.bind(this);
        this.selecionaTipo = this.selecionaTipo.bind(this);
        this.limparFiltro = this.limparFiltro.bind(this);
    }

    componentWillMount(){
        var fav = JSON.parse(localStorage.getItem("favoritos"));
        if(fav === null){
            localStorage.setItem("favoritos", "[]");
        }

        var aux = this.state.rotulos;
        Session.map(function(atividade){
            var existe = false;
            aux.map(function(rotulo){
                if(atividade.tracks === rotulo){
                    existe = true;
                }
            })
            if(!existe){
                aux.push(atividade.tracks);
                
            }
        })
        this.setState({rotulos : aux});
    }

    componentDidMount(){
        PubSub.subscribe('atualizaFavoritos', function(topico, novaLista){
            if(this.state.selecFav){
                this.setState({atividades : novaLista});
                this.filtrar();
            }
        }.bind(this));
    }

    configuraFiltro(evento){
        evento.preventDefault();
        console.log("Before: " + this.state.filtrado);
        var aux = [];
        this.state.rotulos.map(function(rotulo){
            if(document.getElementById(rotulo).checked){
                aux.push(rotulo);
            }
        })
        if(aux.length < this.state.rotulos.length){
            this.setState({filtrado : true, filtro : aux});
            this.filtrar();
        } else {
            this.setState({filtrado : false, filtro : []});
            this.limparFiltro();
        }
        console.log("After: " + this.state.filtrado);
    }

    filtrar(){
        
        //console.log(this.state.filtrado);
        if(this.state.filtrado){
            var aux = this.state.filtro;
            var auxAtiv = [];

            if(!this.state.selecFav){
                Session.map(function(it1){
                    aux.map(function(it2){
                        if(it1.tracks === it2){
                            auxAtiv.push(it1);
                        }
                    })
                })
            } else {
                var favoritos = JSON.parse(localStorage.getItem("favoritos"));
                favoritos.map(function(it1){
                    aux.map(function(it2){
                        if(it1.tracks === it2){
                            auxAtiv.push(it1);
                        }
                    })
                })
            }

            this.setState({atividades : auxAtiv});
        } 
    }

    limparFiltro(evento){
        this.setState({filtrado : false, filtro : []});
        if(!this.state.selecFav){
            this.setState({atividades : Session});
        } else {
            this.setState({atividades : JSON.parse(localStorage.getItem("favoritos"))});
        }
        this.state.rotulos.map(function(rotulo){
            document.getElementById(rotulo).checked = true;
        })
    }

    selecionaTipo(evento){
        console.log(Date().toLocaleString());
        if(evento.target.id === "tipoTodos-Atividades"){
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoFavoritos-Atividades").style.borderBottom = "1px solid #8f1616";

            this.setState({atividades : Session, selecFav : false});
        } else {
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoTodos-Atividades").style.borderBottom = "1px solid #8f1616";

            this.setState({atividades : JSON.parse(localStorage.getItem("favoritos")), selecFav : true});
        }
        this.filtrar();
    }

    render(){
        document.title = 'Semana do ICE - Atividades';
        var localFiltro = this.state.filtro;
        return (
            <div id="list-Atividades">
                <div className="header-Atividades">
                    <h1 className="title-Atividades">Atividades</h1>
                    <ul className="listaTipos-Atividades">
                        <li className="tipos-Atividades" id="tipoTodos-Atividades" onClick={this.selecionaTipo}>TODOS</li>
                        <li className="tipos-Atividades" id="tipoFavoritos-Atividades" onClick={this.selecionaTipo}>FAVORITOS</li>
                    </ul>
                    <Popup trigger={<button id="btFiltro" ></button>} position="bottom right" on="click">
                        <div className="popup-Atividades">
                            <h3>Filtro</h3>
                            <form action="#">
                                {
                                this.state.filtrado ?
                                    
                                    this.state.rotulos.map(function(rotulo){
                                        var checado = false;
                                        
                                        localFiltro.map(function(auxFiltro){
                                            if(rotulo === auxFiltro){
                                                checado = true;
                                            }
                                        })
                                        return(
                                            <div key={rotulo}>
                                                <p className="titleFilter">{rotulo}</p>
                                                <label className="switch">
                                                    <input type="checkbox" id={rotulo} defaultChecked={checado}/>
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                        )
                                    }) : this.state.rotulos.map(function(rotulo){
                                            return(
                                                <div key={rotulo}>
                                                    <p className="titleFilter">{rotulo}</p>
                                                    <label className="switch">
                                                        <input type="checkbox" id={rotulo} defaultChecked={true}/>
                                                        <span className="slider"></span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                }

                                
                                <input type="button" value="Cancelar" />
                                <input type="button" value="Salvar" onClick={this.configuraFiltro}/>
                                <input type="button" value="Resetar" onClick={this.limparFiltro}/>

                            </form>
                        </div>
                    </Popup>
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
                    }) 
                    : (<p id="semAtividade">Nenhuma atividade encontrada!</p>)}
                </div>
            </div>
        );
    }
}

export default AtividadesList;