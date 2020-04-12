import React, { Component } from 'react';
import Speakers from '../data/speakers';
import PalestrantesListItem from './PalestrantesListItem';
import '../css/PalestrantesList.css';
import { AnimatedList } from 'react-animated-list';

class PalestrantesList extends Component {

    constructor() {
        super();
        this.state = { palestrantes: Speakers };
    }

    componentDidMount() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render() {
        document.title = 'Semana do ICE - Palestrantes';
        return (
            <div id="content-Palestrantes">
                <div id="header">
                    <h1 id="title">Palestrantes</h1>
                </div>

                <div id="listSpeakers">
                    <AnimatedList animation={"grow"} initialAnimationDuration={5000} >
                        {this.state.palestrantes.map(function (item) {
                            return (
                                <PalestrantesListItem key={item.id} id={item.id} nome={item.name} descricao={item.about} contato={item.email} perfil={item.profilePic} />
                            );
                        })}
                    </AnimatedList>
                </div>
            </div>
        );
    }
}

export default PalestrantesList;