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
        this.state = { atividades: this.ordenaAtividades(Session), showFav: false, rotulos: [], filtrando: false, filtro: [], showFiltro: false, pesquisa: '', pesquisando: false, showDetalhes: false, atividadeDetalhes: null };

        //Bind's de funções
        this.configuraFiltro = this.configuraFiltro.bind(this);
        this.selecionaTipo = this.selecionaTipo.bind(this);
        this.limparFiltro = this.limparFiltro.bind(this);
        this.ordenaAtividades = this.ordenaAtividades.bind(this);
        this.carregarTexto = this.carregarTexto.bind(this);

        //Adiciona array vazio para as atividades favoritas no primeiro uso
        var fav = JSON.parse(localStorage.getItem("favoritos"));
        if (fav === null) {
            localStorage.setItem("favoritos", "[]");
        }
    };


    componentDidMount() {
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

        PubSub.subscribe('atualizaFavoritos', function (topico, novaLista) {
            if (this.state.showFav) {
                var auxAtividades = this.filtrar(this.ordenaAtividades(novaLista), this.state.filtro, this.state.filtrando);
                if (this.state.pesquisando) {
                    this.setState({ atividades: this.pesquisa(auxAtividades, this.state.pesquisa) });
                } else {
                    this.setState({ atividades: auxAtividades });
                }
            }
        }.bind(this));


        PubSub.subscribe('showDetalhes', function (topico, detalhes) {
            this.setState({ showDetalhes: true, atividadeDetalhes: detalhes.atividade });
        }.bind(this));

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    componentWillUnmount() {
        PubSub.unsubscribe('atualizaFavoritos');
        PubSub.unsubscribe('showDetalhes');
    }

    //Retorna a lista de Atividades de acordo com filtro, pesquisa, etc
    getAtividades(showFav, filtrando, pesquisando, filtro, pesquisa) {
        var atividades;
        if (showFav) {
            atividades = this.filtrar(this.ordenaAtividades(JSON.parse(localStorage.getItem("favoritos"))), filtro, filtrando);
        } else {
            atividades = this.filtrar(this.ordenaAtividades(Session), filtro, filtrando);
        }

        if (pesquisando) {
            atividades = this.pesquisa(atividades, pesquisa);
        }

        return atividades;
    }

    //Método para onChange do input pesquisar
    carregarTexto(event) {
        if (event.target.value !== '') {
            this.setState({ atividades: this.getAtividades(this.state.showFav, this.state.filtrando, true, this.state.filtro, event.target.value), pesquisa: event.target.value, pesquisando: true });
        } else {
            this.setState({ atividades: this.getAtividades(this.state.showFav, this.state.filtrando, false, this.state.filtro, ''), pesquisa: '', pesquisando: false });
        }
    }

    //Método para filtrar as atividades de acordo com a pesquisa
    pesquisa(atividades, texto) {
        return atividades.filter(nTexto => nTexto.name.toUpperCase().indexOf(texto.toUpperCase()) !== -1);
    }

    //Metodo para o popup configurar o filtro
    configuraFiltro(auxFiltro) {
        this.setState({ atividades: this.getAtividades(this.state.showFav, true, this.state.pesquisando, auxFiltro, this.state.pesquisa), filtrando: true, filtro: auxFiltro });
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
    filtrar(tmpAtiv, filtro, filtrando) {

        if (filtrando) {
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
        this.setState({ atividades: this.getAtividades(this.state.showFav, false, this.state.pesquisando, [], this.state.pesquisa), filtrando: false, filtro: [] });
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

        this.setState({ atividades: this.getAtividades(estadoFavorito, this.state.filtrando, this.state.pesquisando, this.state.filtro, this.state.pesquisa), showFav: estadoFavorito });
    }

    //Retorna a lista de atividades para renderizar
    montarLista() {
        var atividades = [];
        for (var i = 0; i < this.state.atividades.length; i++) {
            var favoritos = JSON.parse(localStorage.getItem("favoritos"));
            var ehFavorito = false;
            if (favoritos !== null) {
                for (var j = 0; j < favoritos.length; j++) {
                    if (this.state.atividades[i].id === favoritos[j].id) {
                        ehFavorito = true;
                    }
                }
            }
            for (var k = 0; k < this.state.rotulos.length; k++) {
                if (this.state.rotulos[k] === this.state.atividades[i].tracks[0]) {
                    atividades.push(<AtividadesListItem key={this.state.atividades[i].id} fav={ehFavorito} atividade={this.state.atividades[i]} color={Colors[k]} />);
                }
            }
        }
        return (atividades);
    }

    render() {
        document.title = 'Semana do ICE - Atividades';
        let closePupupFiltro = () => this.setState({ showFiltro: false });

        return (
            <>
                <AtividadeDetalhes onHide={() => { this.setState({ showDetalhes: false }) }} show={this.state.showDetalhes} atividade={this.state.atividadeDetalhes} />
                <div id="content-Atividades">

                    <div id="header">
                        <h1 id="title">Atividades</h1>
                        <ul id="listaTipos">
                            <li className="tipos" id="tipoTodos-Atividades" onClick={this.selecionaTipo}>TODOS</li>
                            <li className="tipos" id="tipoFavoritos-Atividades" onClick={this.selecionaTipo}>FAVORITOS</li>
                        </ul>
                        <div id="headerpesquisa">
                            <input type="text" placeholder="Pesquisar" id="pesquisa" value={this.state.pesquisa} onChange={this.carregarTexto} />
                            <button id="btFiltro" onClick={() => this.setState({ showFiltro: true })}>
                                <img id="imgFilter" alt="Filtro" src={iconFiltro} width="36" height="36" />
                            </button>
                        </div>
                        <PopupFiltro show={this.state.showFiltro} onHide={closePupupFiltro} resetar={() => this.limparFiltro()} salvar={(aux) => this.configuraFiltro(aux)} className="filtro" filtrado={this.state.filtrando ? 1 : 0} filtro={this.state.filtro} rotulos={this.state.rotulos} colors={Colors} />
                    </div>

                    <div id="list">
                        {
                            this.state.atividades.length > 0 ?
                                this.montarLista()
                                : (<p id="semAtividade">Nenhuma atividade encontrada!</p>)
                        }
                    </div>

                </div>
            </>
        );
    }
}

export default AtividadesList;