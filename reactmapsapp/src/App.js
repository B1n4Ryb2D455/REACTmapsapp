import React, { Component } from 'react';
import './styles.css';


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
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
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
                    animation: google.maps.Animation.DROP
                });

                marker.addListener('click', () => {
                    if (marker.getAnimation() !== null) { marker.setAnimation(null); }
                    else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
                    setTimeout(() => { marker.setAnimation(null) }, 1500);
                });

                google.maps.event.addListener(marker, 'click', () => {
                    this.infoWindow.setContent(marker.name);
                    // this.map.setZoom(13);
                    this.map.setCenter(marker.position);
                    this.infoWindow.open(this.map, marker);
                    this.map.panBy(0, -125);
                });

                this.markers.push(marker);
            });

            this.setState({ filterVenues: this.venues });
        })

    }

    filterVenues (query) {
        this.markers.forEach(marker => {
            marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
            marker.setVisible(true) :
            marker.setVisible(false);
        });

        this.setState({ query });
    }

    render() {
        return (
            <div>
            <div id="map">

            </div>
            <div id="sidebar">
                <input value={this.state.query} onChange={(e) => { this.filterVenues(e.target.value) }}/>
                <br/>
                {
                    this.state.filterVenues && this.state.filterVenues.length > 0 && this.state.filterVenues.map((venue, index) => (
                        <div className="venue-item">
                            {venue.name}
                        </div>
                    ))
                }
            </div>
           </div>
        );
    }
}

export default App;