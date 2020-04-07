import React, { Component } from 'react';
import Session from '../data/sessions';
import Colors from '../data/colors';
import AtividadesListItem from './AtividadesListItem';
import '../css/AtividadesList.css';
import PubSub from 'pubsub-js';
import { parseISO, differenceInSeconds } from 'date-fns';
import PopupFiltro from '../components/PopupFiltro';
import AtividadeDetalhes from './AtividadeDetalhes';

import iconFiltro from '../img/filter.png';

class AtividadesList extends Component {

    constructor() {
        super();
        this.state = { atividades: this.ordenaAtividades(Session), selecFav: false, rotulos: [], filtrado: false, filtro: [], popupFiltro: false, pesquisa: '', pesquisando: false, mostarDetalhes: false, atividadeFocus: null };

        //Bind's de funções
        this.configuraFiltro = this.configuraFiltro.bind(this);
        this.selecionaTipo = this.selecionaTipo.bind(this);
        this.limparFiltro = this.limparFiltro.bind(this);
        this.ordenaAtividades = this.ordenaAtividades.bind(this);
        this.carregarTexto = this.carregarTexto.bind(this);
    }

    componentWillMount() {
        var fav = JSON.parse(localStorage.getItem("favoritos"));
        if (fav === null) {
            localStorage.setItem("favoritos", "[]");
        }

        var aux = this.state.rotulos;
        Session.map(function (atividade) {
            var existe = false;
            aux.map(function (rotulo) {
                if (atividade.tracks[0] === rotulo) {
                    existe = true;
                }
                return (null);
            })
            if (!existe) {
                aux.push(atividade.tracks[0]);

            }
            return (null);
        })
        this.setState({ rotulos: aux });
    }

    componentDidMount() {
        PubSub.subscribe('atualizaFavoritos', function (topico, novaLista) {
            if (this.state.selecFav) {
                var auxAtividades = this.filtrar(this.ordenaAtividades(novaLista), this.state.filtro, this.state.filtrado);
                if (this.state.pesquisando) {
                    this.setState({ atividades: this.pesquisa(auxAtividades, this.state.pesquisa) });
                } else {
                    this.setState({ atividades: auxAtividades });
                }
            }
        }.bind(this));


        PubSub.subscribe('showDetalhes', function (topico, detalhes) {
            this.setState({ mostarDetalhes: true, atividadeFocus: detalhes.atividade });
        }.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe('atualizaFavoritos');
    }

    getAtividades(selecFav, filtrado, pesquisando, filtro, pesquisa) {
        var atividades;
        if (selecFav) {
            atividades = this.filtrar(this.ordenaAtividades(JSON.parse(localStorage.getItem("favoritos"))), filtro, filtrado);
        } else {
            atividades = this.filtrar(this.ordenaAtividades(Session), filtro, filtrado);
        }

        if (pesquisando) {
            atividades = this.pesquisa(atividades, pesquisa);
        }

        return atividades;
    }

    //Método para onChange do input pesquisar
    carregarTexto(event) {
        if (event.target.value !== '') {
            this.setState({ atividades: this.getAtividades(this.state.selecFav, this.state.filtrado, true, this.state.filtro, event.target.value), pesquisa: event.target.value, pesquisando: true });
        } else {
            this.setState({ atividades: this.getAtividades(this.state.selecFav, this.state.filtrado, false, this.state.filtro, ''), pesquisa: '', pesquisando: false });
        }
    }

    //Método para filtrar as atividades de acordo com a pesquisa
    pesquisa(atividades, texto) {
        return atividades.filter(nTexto => nTexto.name.toUpperCase().indexOf(texto.toUpperCase()) !== -1);
    }

    //Metodo para o popup configurar o filtro
    configuraFiltro(auxFiltro) {
        this.setState({ atividades: this.getAtividades(this.state.selecFav, true, this.state.pesquisando, auxFiltro, this.state.pesquisa), filtrado: true, filtro: auxFiltro });
    }

    //Método para ordanar as atividades pela data
    ordenaAtividades(ativ) {

        ativ.sort(function compare(a, b) {
            if (differenceInSeconds(parseISO(b.dateTimeStart), parseISO(a.dateTimeStart)) > 0) return -1;
            if (differenceInSeconds(parseISO(b.dateTimeStart), parseISO(a.dateTimeStart)) < 0) return 1;
            return 0;
        })

        return ativ;
    }

    //Método que rotorna um array de atividades filtradas
    filtrar(tmpAtiv, filtro, filtrado) {

        if (filtrado) {
            var auxAtiv = [];

            for (var i = 0; i < tmpAtiv.length; i++) {
                for (var j = 0; j < filtro.length; j++) {
                    if (tmpAtiv[i].tracks[0] === filtro[j]) {
                        auxAtiv.push(tmpAtiv[i]);
                    }
                }
            }

            return auxAtiv;
        } else {
            return tmpAtiv;
        }
    }

    //Método para o popup resetar o filtro
    limparFiltro() {
        this.setState({ atividades: this.getAtividades(this.state.selecFav, false, this.state.pesquisando, [], this.state.pesquisa), filtrado: false, filtro: [] });
    }

    //Método para selecionar entre todos e favoritos
    selecionaTipo(evento) {
        var estadoFavorito
        if (evento.target.id === "tipoTodos-Atividades") {
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoFavoritos-Atividades").style.borderBottom = "1px solid #8f1616";

            estadoFavorito = false;
        } else {
            document.getElementById(evento.target.id).style.borderBottom = "1px solid #ffffff";
            document.getElementById("tipoTodos-Atividades").style.borderBottom = "1px solid #8f1616";

            estadoFavorito = true;
        }

        this.setState({ atividades: this.getAtividades(estadoFavorito, this.state.filtrado, this.state.pesquisando, this.state.filtro, this.state.pesquisa), selecFav: estadoFavorito });
    }

    render() {
        document.title = 'Semana do ICE - Atividades';
        var localRotulos = this.state.rotulos;
        let closePupupFiltro = () => this.setState({ popupFiltro: false });

        return (
            <>
                <AtividadeDetalhes onHide={() => { this.setState({ mostarDetalhes: false }) }} show={this.state.mostarDetalhes} atividade={this.state.atividadeFocus} />
                <div id="content-Atividades">

                    <div id="header">
                        <h1 id="title">Atividades</h1>
                        <ul id="listaTipos">
                            <li className="tipos" id="tipoTodos-Atividades" onClick={this.selecionaTipo}>TODOS</li>
                            <li className="tipos" id="tipoFavoritos-Atividades" onClick={this.selecionaTipo}>FAVORITOS</li>
                        </ul>
                        <div id="headerpesquisa">
                            <input type="text" placeholder="Pesquisar" id="pesquisa" value={this.state.pesquisa} onChange={this.carregarTexto} />
                            <button id="btFiltro" onClick={() => this.setState({ popupFiltro: true })}>
                                <img id="imgFilter" alt="Filtro" src={iconFiltro} width="36" height="36" />
                            </button>
                        </div>
                        <PopupFiltro show={this.state.popupFiltro} onHide={closePupupFiltro} resetar={() => this.limparFiltro()} salvar={(aux) => this.configuraFiltro(aux)} className="filtro" filtrado={this.state.filtrado ? 1 : 0} filtro={this.state.filtro} rotulos={this.state.rotulos} colors={Colors} />
                    </div>

                    <div id="list">
                        {this.state.atividades.length > 0 ?
                            this.state.atividades.map(function (item) {
                                var favoritos = JSON.parse(localStorage.getItem("favoritos"));
                                var existe = false;
                                if (favoritos != null) {
                                    favoritos.map(function (fav) {
                                        if (item.id === fav.id) {
                                            existe = true;
                                        }
                                        return (null);
                                    })
                                }
                                if (!existe) {
                                    for (var i = 0; i < localRotulos.length; i++) {
                                        if (localRotulos[i] === item.tracks[0]) {
                                            return (
                                                <AtividadesListItem key={item.id} fav={false} id={item.id} atividade={item} color={Colors[i]} />
                                            );
                                        }
                                    }
                                } else {
                                    for (var j = 0; j < localRotulos.length; j++) {
                                        if (localRotulos[j] === item.tracks[0]) {
                                            return (
                                                <AtividadesListItem key={item.id} fav={true} id={item.id} atividade={item} color={Colors[j]} />
                                            );
                                        }
                                    }
                                }
                                return (null);
                            })
                            : (<p id="semAtividade">Nenhuma atividade encontrada!</p>)}
                    </div>

                </div>
            </>
        );
    }
}

export default AtividadesList;