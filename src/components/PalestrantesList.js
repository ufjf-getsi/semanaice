import React, { Component } from 'react';
import PalestrantesListItem from './PalestrantesListItem';
import '../css/PalestrantesList.css';

class PalestrantesList extends Component{

render(){
    return (
        <div id="list-Palestrantes">
            <div className="header-Palestrantes">
                <h1 className="title-Palestrantes">Palestrantes</h1>
            </div>

            <div className="content-Palestrantes">
                <PalestrantesListItem/>
                <PalestrantesListItem/>
                <PalestrantesListItem/>
                <PalestrantesListItem/>
                <PalestrantesListItem/>
                <PalestrantesListItem/>
                <PalestrantesListItem/>
                <PalestrantesListItem/>
            </div>
        </div>
    );
}
}

export default PalestrantesList;