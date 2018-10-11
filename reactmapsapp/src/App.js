import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SideBar from './SideBar';

class App extends Component {
	state = {
		venues: []
	};

	componentDidMount() {
		this.getVenues();
		// this.renderMap()
	}

	renderMap = () => {
		loadScript(
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBQowO9QXcPdkhyyemu370I_16x62BtX8k&callback=initMap'
		);
		window.initMap = this.initMap;
	};

	getVenues = () => {
		const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
		const parameters = {
			client_id: 'IZB4KA3CRYVCJJYZF1MJGU23KJLOY1LTWKSDEH5YGGZLYQZQ',
			client_secret: '3W5RLNDW2OKJJH4HH0CGI5SHMPQXMU0F3CN02ZHRQYOMD0FM',
			query: 'sights',
			near: 'Kennedy Space Center',
			v: '20182507'
		};

		axios
			.get(endPoint + new URLSearchParams(parameters))
			.then((response) => {
				this.setState(
					{
						venues: response.data.response.groups[0].items
					},
					this.renderMap()
				);
			})
			.catch((error) => {
				console.log('ERROR ' + error);
			});
	};

	initMap = () => {
		const map = new window.google.maps.Map(document.getElementById('map'), {
			center: { lat: 28.5728722, lng: -80.6489808 },
			zoom: 10
		});

		const infowindow = new window.google.maps.InfoWindow();

		this.state.venues.map((eachVenue) => {
			const contentString = `${eachVenue.venue.name}`;

			const marker = new window.google.maps.Marker({
				position: { lat: eachVenue.venue.location.lat, lng: eachVenue.venue.location.lng },
				map: map,
				title: eachVenue.venue.name
			});

			marker.addListener('click', function() {
				infowindow.setContent(contentString);

				infowindow.open(map, marker);
			});
		});
	};

	render() {
		return (
      <main>
        <SideBar />
				<div id="map" />
			</main>
		);
	}
}

function loadScript(url) {
	const index = window.document.getElementsByTagName('script')[0];
	const script = window.document.createElement('script');
	script.src = url;
	script.async = true;
	script.defer = true;
	index.parentNode.insertBefore(script, index);
}

export default App;
