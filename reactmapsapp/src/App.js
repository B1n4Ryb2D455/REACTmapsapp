import React, { Component } from 'react';
import './App.css';
import './styles.css';

import { load_google_maps, load_places } from './funcs';

// tutorial https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be
// tutorial https://youtu.be/lDVaZY0aG2w
// tutorial https://youtu.be/ywdxLNjhBYw

class App extends Component {

    componentDidMount() {
        let googleMapsPromise = load_google_maps();
        let placesPromise = load_places();

        Promise.all([
            googleMapsPromise,
            placesPromise
        ])
        .then(values => {
            let google = values[0];
            let venues = values[1].response.venues;

            this.google = google;
            this.markers = [];
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                scrollwheel: true,
                center: { lat: venues[0].location.lat, lng: venues[0].location.lng }
            });

            venues.forEach(venue => {
                let marker = new google.maps.Marker({
                    position: { lat: venue.location.lat, lng: venue.location.lng },
                    map: this.map,
                    venue: venue,
                    id: venue.id,
                    name: venue.name,
                    animation: google.maps.Animation.DROP
                });
            });

        })

    }

    render() {
        return (
            <div id="map">

            </div>
        );
    }
}

export default App;