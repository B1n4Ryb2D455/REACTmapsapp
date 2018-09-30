import React, { Component } from 'react';

import './App.css';



class App extends Component {

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBQowO9QXcPdkhyyemu370I_16x62BtX8k&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 28.5728722, lng: -80.6489808},
      zoom: 8
    })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>

    );
  }
}

function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
