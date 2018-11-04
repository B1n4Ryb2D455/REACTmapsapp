import React, { Component } from 'react';
import './styles.css';
import Sidebar from './Components/Sidebar';
import Map from './Components/Map';

import { load_google_maps, load_places } from './funcs';

// tutorial https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be
// tutorial https://youtu.be/lDVaZY0aG2w
// tutorial https://youtu.be/ywdxLNjhBYw
// tutorial https://www.youtube.com/watch?v=5J6fs_BlVC0&t=2262s
// tutorial https://www.youtube.com/watch?v=Uw5Ij56RhME

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    componentDidMount() {
        let googleMapsPromise = load_google_maps();
        let placesPromise = load_places();

        Promise.all([
            googleMapsPromise,
            placesPromise
        ])
            .then(values => {
                let google = values[0];
                this.venues = values[1].response.venues;

                this.google = google;
                this.markers = [];
                this.infowindow = new google.maps.InfoWindow();
                this.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    scrollwheel: true,
                    center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
                });

                this.venues.forEach(venue => {
                    let marker = new google.maps.Marker({
                        position: { lat: venue.location.lat, lng: venue.location.lng },
                        map: this.map,
                        venue: venue,
                        id: venue.id,
                        name: venue.name,
                        location: venue.location.formattedAddress,
                        animation: google.maps.Animation.DROP
                    });

                    marker.addListener('click', () => {
                        if (marker.getAnimation() !== null) { marker.setAnimation(null); }
                        else { marker.setAnimation(google.maps.Animation.BOUNCE); }
                        setTimeout(() => { marker.setAnimation(null) }, 1500);
                    });
                    google.maps.event.addListener(marker, 'click', () => {
                        this.infowindow.setContent("<p>" + marker.name + "<br />" + marker.location + "</p>");
                        this.map.setCenter(marker.position);
                        this.infowindow.open(this.map, marker);
                    });

                    this.markers.push(marker);
                    console.log(marker.location);
                    console.log(this.venues);
                });

                this.setState({ filteredVenues: this.venues });
            })

    }

    listItemClick = (venue) => {
        let marker = this.markers.filter(m => m.id === venue.id)[0];
        this.infowindow.setContent("<p>" + marker.name + "<br />" + marker.location + "</p>");
        this.map.setCenter(marker.position);
        this.infowindow.open(this.map, marker);
        console.log(marker);
        if (marker.getAnimation() !== null) { marker.setAnimation(null); }
        else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
        setTimeout(() => { marker.setAnimation(null) }, 1500);
    }

    filterVenues = (query) => {
        let f = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
        this.markers.forEach(marker => {
            marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
                marker.setVisible(true) :
                marker.setVisible(false);
        });

        this.setState({ filteredVenues: f, query });
    }

    render() {
        return (
            <div id="app">
                <Map />
                <Sidebar
                    filterVenues={this.filterVenues}
                    filteredVenues={this.state.filteredVenues}
                    listItemClick={this.listItemClick} />
            </div>
        );
    }
}

export default App;