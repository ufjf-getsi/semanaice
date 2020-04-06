import React, { Component } from 'react';
import Speakers from '../data/speakers';
import PalestrantesListItem from './PalestrantesListItem';
import '../css/PalestrantesList.css';

class PalestrantesList extends Component {

    constructor() {
        super();
        this.state = { palestrantes: Speakers };
    }

    render() {
        document.title = 'Semana do ICE - Palestrantes';
        return (
            <div id="content-Palestrantes">
                <div id="header">
                    <h1 id="title">Palestrantes</h1>
                </div>

                <div id="listSpeakers">
                    {this.state.palestrantes.map(function (item) {
                        return (
                            <PalestrantesListItem key={item.id} id={item.id} nome={item.name} descricao={item.about} contato={item.email} perfil={item.profilePic} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PalestrantesList;