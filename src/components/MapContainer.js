import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends Component {

  render() {
    return (
      <div id="map-Mapa">
        <Map
          google={this.props.google}
          zoom={17}
          style={mapStyles}
          initialCenter={{ lat: -21.7751281, lng: -43.371809 }}

        >
          <Marker position={{ lat: -21.7751281, lng: -43.371809 }} />
        </Map>
      </div>
    );
  }
}

const mapStyles = {
  width: '50%',
  height: '430%',
};

export default GoogleApiWrapper({
  apiKey: '&'
})(MapContainer);