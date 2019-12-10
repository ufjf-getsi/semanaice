import React, { Component } from 'react';
import Speakers from '../data/speakers';
import PalestrantesListItem from './PalestrantesListItem';
import '../css/PalestrantesList.css';

class PalestrantesList extends Component{

    constructor(){
        super();
        this.state = {palestrantes : Speakers};
    }

    render(){
        return (
            <div id="list-Palestrantes">
                <div className="header-Palestrantes">
                    <h1 className="title-Palestrantes">Palestrantes</h1>
                </div>

                <div className="content-Palestrantes">
                    {this.state.palestrantes.map(function(item){
                        return (
                            <PalestrantesListItem key={item.id} id={item.id} nome={item.name} descricao={item.about} contato={item.email} perfil={item.profilePic}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PalestrantesList;