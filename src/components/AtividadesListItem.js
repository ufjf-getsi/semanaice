import React, { Component } from 'react';
import '../css/AtividadesListItem.css';
import Speakers from '../data/speakers'
import PubSub from 'pubsub-js';
import { parseISO, format, formatRelative, formatDistance, differenceInDays } from 'date-fns';
import {ptBR} from 'date-fns/esm/locale'


class AtividadesListItem extends Component{

    constructor(props){
        super(props);
        this.state = {mesmoDia : null}
    }

    componentWillMount(){
        var primeiraData = parseISO(this.props.dataInicio);
        var segundaData = parseISO(this.props.dataFinal);

        var diferencaDias = differenceInDays(primeiraData, segundaData);

        if(diferencaDias === 0){
            this.setState({mesmoDia : true});
        } else {
            this.setState({mesmoDia : false});
        }
    }

    componentDidMount(){
        if(this.props.fav){
            document.getElementById(this.props.id).style.background = "#d61f1f";
            document.getElementById(this.props.id).style.color = "#ffffff";
        } else {
            document.getElementById(this.props.id).style.background = "#ffffff";
            document.getElementById(this.props.id).style.color = "#000000";
        }
    }

    favoritar(evento){    
        if(localStorage.getItem("favoritos") != null){
            var favoritos = JSON.parse(localStorage.getItem("favoritos"));
            var atual = this.props.atividade;
            var existe = false;
            favoritos.map(function(item){
                if(item.id === atual.id){
                    existe = true;
                }
                return(null);
            })
            if(!existe){
                favoritos.push(this.props.atividade);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));

                document.getElementById(this.props.id).style.background = "#d61f1f";
                document.getElementById(this.props.id).style.color = "#ffffff";
            } else {
                var novoFavoritos = [];
                favoritos.map(function(item){
                    if(item.id !== atual.id){
                        novoFavoritos.push(item);
                    }
                })
                localStorage.setItem("favoritos", JSON.stringify(novoFavoritos));
                PubSub.publish('atualizaFavoritos', novoFavoritos);

                document.getElementById(this.props.id).style.background = "#ffffff";
                document.getElementById(this.props.id).style.color = "#000000";
            }
        } else {
            var favoritos = [];
            favoritos.push(this.props.atividade);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            document.getElementById(this.props.id).style.background = "#d61f1f";
            document.getElementById(this.props.id).style.color = "#ffffff";
        }
    }


    render(){
        if(this.state.mesmoDia){
            return (
                <div id="item-AtividadesItem">
                    <p className="titulo-AtividadesItem">{this.props.nome}</p>
                    <p className="horarioLocal-AtividadesItem">{format(parseISO(this.props.dataInicio), "'Dia' dd 'de' MMMM', de ' HH:mm'hs'", {locale: ptBR})} as {format(parseISO(this.props.dataFinal), "HH:mm'hs'", {locale: ptBR})}, Local: {this.props.local}</p>
                    <button className="favoritar-AtividadesItem" id={this.props.id} onClick={this.favoritar.bind(this)}>Favoritar </button>
                    
                </div>
            );
        } else {
            return (
                <div id="item-AtividadesItem">
                    <p className="titulo-AtividadesItem">{this.props.nome}</p>
                    <p className="horarioLocal-AtividadesItem">{format(parseISO(this.props.dataInicio), "'Do dia' dd 'de' MMMM', às ' HH:mm'hs,'", {locale: ptBR})} até {format(parseISO(this.props.dataFinal), "'dia' dd 'de' MMMM', às ' HH:mm'hs'", {locale: ptBR})}, Local: {this.props.local}</p>
                    <button className="favoritar-AtividadesItem" id={this.props.id} onClick={this.favoritar.bind(this)}>Favoritar </button>
                    
                </div>
            );
        }
    }
}

const firstDate = parseISO('2018-04-01 16:00:00');
const secondDate = parseISO('2018-04-02 16:00:00');

const formattedDate = format(
    firstDate, 
    "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
    {locale: ptBR}
  );

export default AtividadesListItem;