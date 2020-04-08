import React, { Component } from 'react';
import '../css/AtividadesListItem.css';
import PubSub from 'pubsub-js';
import { parseISO, format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';


class AtividadesListItem extends Component {

    constructor(props) {
        super(props);
        this.state = { mesmoDia: null };
    }

    componentWillMount() {
        var primeiraData = parseISO(this.props.atividade.dateTimeStart);
        var segundaData = parseISO(this.props.atividade.dateTimeEnd);

        var diferencaDias = differenceInDays(primeiraData, segundaData);

        if (diferencaDias === 0) {
            this.setState({ mesmoDia: true });
        } else {
            this.setState({ mesmoDia: false });
        }
    }

    componentDidMount() {
        if (this.props.fav) {
            document.getElementById(this.props.atividade.id).style.background = "#d61f1f";
            document.getElementById(this.props.atividade.id).style.color = "#ffffff";
        } else {
            document.getElementById(this.props.atividade.id).style.background = "#ffffff";
            document.getElementById(this.props.atividade.id).style.color = "#000000";
        }
    }

    //Método para favoritar. Armazena em local storage e atualiza lista através do Pubsub
    favoritar(evento) {
        var favoritos
        if (localStorage.getItem("favoritos") != null) {
            favoritos = JSON.parse(localStorage.getItem("favoritos"));
            var atual = this.props.atividade;
            var existe = false;
            favoritos.map(function (item) {
                if (item.id === atual.id) {
                    existe = true;
                }
                return (null);
            })
            if (!existe) {
                favoritos.push(this.props.atividade);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));

                document.getElementById(this.props.atividade.id).style.background = "#d61f1f";
                document.getElementById(this.props.atividade.id).style.color = "#ffffff";
            } else {
                var novoFavoritos = [];
                favoritos.map(function (item) {
                    if (item.id !== atual.id) {
                        novoFavoritos.push(item);
                    }
                    return (null);
                })
                localStorage.setItem("favoritos", JSON.stringify(novoFavoritos));
                PubSub.publish('atualizaFavoritos', novoFavoritos);

                document.getElementById(this.props.atividade.id).style.background = "#ffffff";
                document.getElementById(this.props.atividade.id).style.color = "#000000";
            }
        } else {
            favoritos = [];
            favoritos.push(this.props.atividade);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            document.getElementById(this.props.atividade.id).style.background = "#d61f1f";
            document.getElementById(this.props.atividade.id).style.color = "#ffffff";
        }
    }

    //Método do clique do item. Feito através do PubSub
    selectItem() {
        var show = { show: true, atividade: this.props.atividade };
        PubSub.publish('showDetalhes', show);
    }


    render() {
        if (this.state.mesmoDia) {
            return (
                <div id="item-AtividadesItem" style={{ borderLeftColor: this.props.color.hexadecimal }} >
                    <div id="boxDados" onClick={this.selectItem.bind(this)} >
                        <p id="titulo">{this.props.atividade.name}</p>
                        <p id="horarioLocal">{format(parseISO(this.props.atividade.dateTimeStart), "'Dia' dd 'de' MMMM', de ' HH:mm'hs'", { locale: ptBR })} as {format(parseISO(this.props.atividade.dateTimeEnd), "HH:mm'hs'", { locale: ptBR })}, Local: {this.props.atividade.location}</p>
                    </div>
                    <button className="favoritar" id={this.props.atividade.id} onClick={this.favoritar.bind(this)}>Favoritar </button>

                </div>
            );
        } else {
            return (
                <div id="item-AtividadesItem" style={{ borderLeftColor: this.props.color.hexadecimal }} onClick={this.selectItem.bind(this)} >
                    <div onClick={this.selectItem.bind(this)} >
                        <p id="titulo">{this.props.atividade.name}</p>
                        <p id="horarioLocal">{format(parseISO(this.props.atividade.dateTimeStart), "'Do dia' dd 'de' MMMM', às ' HH:mm'hs,'", { locale: ptBR })} até {format(parseISO(this.props.atividade.dateTimeEnd), "'dia' dd 'de' MMMM', às ' HH:mm'hs'", { locale: ptBR })}, Local: {this.props.atividade.location}</p>
                    </div>
                    <button className="favoritar" id={this.props.atividade.id} onClick={this.favoritar.bind(this)}>Favoritar </button>

                </div>
            );
        }
    }
}

export default AtividadesListItem;