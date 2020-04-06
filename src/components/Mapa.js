import React, { Component } from 'react';
import '../css/Mapa.css';
import MapContainer from './MapContainer';

class Mapa extends Component {

    render() {
        document.title = 'Semana do ICE - Mapa';
        return (
            <div id="content-Mapa">
                <div id="header">
                    <h1 id="title">Mapa</h1>
                </div>

                <div id="map">
                    <MapContainer />
                </div>
            </div>
        );
    }
}

export default Mapa;