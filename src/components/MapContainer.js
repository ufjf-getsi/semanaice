import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Locations from '../data/locations.json';

var x = window.matchMedia("(max-width: 48em)");

export class MapContainer extends Component {
  constructor() {
    super();
    if (x.matches) {
      this.state = {mapStyles: {width: '100%', height: window.innerHeight-78}};
    } else {
      this.state = {mapStyles: {width: '100%', height: window.innerHeight-114}};
    }
    this.windowManager = this.windowManager.bind(this);

    x.addListener(this.windowManager);
  }

  windowManager(x) {
    if (x.matches) {
      this.setState({mapStyles: {width: '100%', height: window.innerHeight-78}});
    } else {
      this.setState({mapStyles: {width: '100%', height: window.innerHeight-114}});
    }
  }

  render() {
    return (
      <div id="map-Mapa">
        <Map
          google={this.props.google}
          zoom={18}
          style={this.state.mapStyles}
          initialCenter={{ lat: -21.7751281, lng: -43.371809 }}
          id="map-Google"
        >
          {
            Locations.map(function(local) {
              return (<Marker key={local.id} position={local} />);
            })
          }
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: '&'
})(MapContainer);