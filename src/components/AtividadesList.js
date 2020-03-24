import React, { Component } from 'react';
import Session from '../data/sessions';
import Colors from '../data/colors';
import AtividadesListItem from './AtividadesListItem';
import '../css/AtividadesList.css';
import PubSub from 'pubsub-js';
import { parseISO, differenceInSeconds } from 'date-fns';
import PopupFiltro from '../components/PopupFiltro';
import AtividadeDetalhes from './AtividadeDetalhes';

class AtividadesList extends Component{

    constructor(){
        super();
        this.state = {atividades : this.ordenaAtividades(Session), selecFav : false, rotulos : [], filtrado : false, filtro : [], popupFiltro : false, pesquisa: '', pesquisando: false, mostarDetalhes: false, atividadeFocus: null};
    
        this.configuraFiltro = this.configuraFiltro.bind(this);
        this.selecionaTipo = this.selecionaTipo.bind(this);
        this.limparFiltro = this.limparFiltro.bind(this);
        this.ordenaAtividades = this.ordenaAtividades.bind(this);
        this.carregarTexto = this.carregarTexto.bind(this);
    }

    carregarTexto(event) {
        var atividades;
        if(!this.state.selecFav){
            atividades = this.filtrar(this.ordenaAtividades(Session), this.state.filtro, this.state.filtrado);
        } else {
            atividades = this.filtrar(this.ordenaAtividades(JSON.parse(localStorage.getItem("favoritos"))), this.state.filtro, this.state.filtrado);
        }

        if(event.target.value !== '') {
            this.setState({atividades: this.pesquisa(atividades, event.target.value), pesquisa: event.target.value, pesquisando: true});
        } else {
            this.setState({atividades: atividades, pesquisa: '', pesquisando: false});
        }
    }

    pesquisa(atividades, texto) {
        return atividades.filter(nTexto => nTexto.name.toUpperCase().indexOf(texto.toUpperCase()) !== -1);
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
                return(null);
            })
            if(!existe){
                aux.push(atividade.tracks);
                
            }
            return(null);
        })
        this.setState({rotulos : aux});
    }

    componentDidMount(){
        PubSub.subscribe('atualizaFavoritos', function(topico, novaLista){
            if(this.state.selecFav){
                var auxAtividades = this.filtrar(this.ordenaAtividades(novaLista), this.state.filtro, this.state.filtrado);
                if(this.state.pesquisando) {
                    this.setState({atividades : this.pesquisa(auxAtividades, this.state.pesquisa)});
                } else {
                    this.setState({atividades : auxAtividades});
                }
            }
        }.bind(this));


        PubSub.subscribe('showDetalhes', function(topico, detalhes){
            this.setState({mostarDetalhes: true, atividadeFocus: detalhes.atividade});
        }.bind(this));
    }

    componentWillUnmount(){
        PubSub.unsubscribe('atualizaFavoritos');
    }

    configuraFiltro(evento){
        //evento.preventDefault();
        
        var aux = [];
        this.state.rotulos.map(function(rotulo){
            if(document.getElementById(rotulo).checked){
                aux.push(rotulo);
            }
            return(null);
        })
        if(aux.length < this.state.rotulos.length){
            if(this.state.selecFav){
                this.setState({atividades : this.filtrar(JSON.parse(localStorage.getItem("favoritos")), aux, true), filtrado : true, filtro : aux});
            } else {
                this.setState({atividades : this.filtrar(Session, aux, true), filtrado : true, filtro : aux});
            }
        } else {
            this.setState({filtrado : false, filtro : []});
            this.limparFiltro();
        }
    }

    ordenaAtividades(ativ){

        ativ.sort(function compare(a, b) {
            if (differenceInSeconds(parseISO(b.dateTimeStart), parseISO(a.dateTimeStart)) > 0) return -1;
            if (differenceInSeconds(parseISO(b.dateTimeStart), parseISO(a.dateTimeStart)) < 0) return 1;
            return 0;
        })

        return ativ;
    }

    filtrar(tmpAtiv, filtro, filtrado){
        
        if(filtrado){
            var auxAtiv = [];

            tmpAtiv.map(function(it1){
                filtro.map(function(it2){
                    if(it1.tracks === it2){
                        auxAtiv.push(it1);
                    }
                })
            })
            return auxAtiv;
        } else {
            return tmpAtiv;
        }
    }

    limparFiltro(){
        this.setState({filtrado : false, filtro : []});
        if(!this.state.selecFav){
            this.setState({atividades : Session});
        } else {
            this.setState({atividades : JSON.parse(localStorage.getItem("favoritos"))});
        }
        this.state.rotulos.map(function(rotulo){
            if(document.getElementById(rotulo)){
                document.getElementById(rotulo).checked = true;
            }
            return(null);
        })
    }

    selecionaTipo(evento){
        var auxAtividades;
        var stadoFavorito
        if(evento.target.id === "tipoTodos-Atividades"){
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoFavoritos-Atividades").style.borderBottom = "1px solid #8f1616";

            auxAtividades = this.filtrar(this.ordenaAtividades(Session), this.state.filtro, this.state.filtrado);
            stadoFavorito = false;
        } else {
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoTodos-Atividades").style.borderBottom = "1px solid #8f1616";

            auxAtividades = this.filtrar(this.ordenaAtividades(JSON.parse(localStorage.getItem("favoritos"))), this.state.filtro, this.state.filtrado);
            stadoFavorito = true;
        }
        if(this.state.pesquisando) {
            this.setState({atividades : this.pesquisa(auxAtividades, this.state.pesquisa), selecFav : stadoFavorito});
        } else {
            this.setState({atividades : auxAtividades, selecFav : stadoFavorito});
        }
    }

    render(){
        document.title = 'Semana do ICE - Atividades';
        var localRotulos = this.state.rotulos;
        let closePupupFiltro =() => this.setState({popupFiltro : false});
        let save =() => this.configuraFiltro();
        let reset =() => this.limparFiltro();

        return (
            <>
            <AtividadeDetalhes onHide={() => {this.setState({mostarDetalhes: false})}} show={this.state.mostarDetalhes} atividade={this.state.atividadeFocus} />
            <div id="list-Atividades">
                
                <div className="header-Atividades">
                <h1 className="title-Atividades">Atividades</h1>
                    <ul className="listaTipos-Atividades">
                        <li className="tipos-Atividades" id="tipoTodos-Atividades" onClick={this.selecionaTipo}>TODOS</li>
                        <li className="tipos-Atividades" id="tipoFavoritos-Atividades" onClick={this.selecionaTipo}>FAVORITOS</li>
                    </ul>
                    <div id="headerpesquisa-Atividades">
                        <input type="text" placeholder="Pesquisar" id="pesquisar-Atividade" value={this.state.pesquisa} onChange={this.carregarTexto} />
                        <button id="btFiltro-Atividade" onClick={()=> this.setState({popupFiltro : true})} />
                    </div>
                    <PopupFiltro show={this.state.popupFiltro} onHide={closePupupFiltro} resetar={reset} salvar={save} className="filtro" filtrado={this.state.filtrado ? 1 : 0} filtro={this.state.filtro} rotulos={this.state.rotulos} colors={Colors} />
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
                            for(var i=0; i<localRotulos.length; i++){
                                if(localRotulos[i] === item.tracks) {
                                    return (
                                        <AtividadesListItem key={item.id} fav={false} id={item.id} nome={item.name} dataInicio={item.dateTimeStart} dataFinal={item.dateTimeEnd} local={item.location} atividade={item} color={Colors[i]}/>
                                    );
                                }
                            }
                        } else {
                            for(var j=0; j<localRotulos.length; j++){
                                if(localRotulos[j] === item.tracks) {
                                    return (
                                        <AtividadesListItem key={item.id} fav={true} id={item.id} nome={item.name} dataInicio={item.dateTimeStart} dataFinal={item.dateTimeEnd} local={item.location} atividade={item} color={Colors[j]}/>
                                    );
                                }
                            }
                        }
                        return(null);
                    }) 
                    : (<p id="semAtividade">Nenhuma atividade encontrada!</p>)}
                </div>
                
            </div>
            </>
        );
    }
}

export default AtividadesList;