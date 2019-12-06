import React, { Component } from 'react';
import '../css/Mapa.css';
import MapContainer from './MapContainer';

class Mapa extends Component {

    render() {
        return(
            <div className="content-Mapa">
                <div className="header-Mapa">
                    <h1 className="title-Mapa">Mapa</h1>
                </div>

                <div className="map-Mapa">
                    <MapContainer/>
                </div>
            </div>
        );
    }
}

export default Mapa;