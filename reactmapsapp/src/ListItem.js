import React, { Component } from "react";

export default class ListItem extends Component {

    render() {

        const listVenues = [
            { name: "Apollo/Saturn V Center" },
            { name: "Playalinda Beach" },
            { name: "Launch Control Center" },
            { name: "Kennedy Space Center" },
            { name: "Launch Pad 39A (LC-39A)" },
            { name: "Space View Park" },
            { name: "Atlantis Exhibit Kennedy Space Center" },
            { name: "Kennedy Space Center Visitor Complex" },
            { name: "Rocket Garden" },
            { name: "Press Site" },
            { name: "Early Space Exploration" },
            { name: "Astronaut Memorial" },
            { name: "Launch Pad 39 Observation Gantry" },
            { name: "Shuttle Launch Experience" },
            { name: "Astronaut Hall Of Fame" },
            { name: "Aquaduck, Disney Dream" },
            { name: "Indian River" },
            { name: "Banana River" },
            { name: "Port Canaveral" }
        ]

        return <ul>
            {listVenues.map(venue => (
                <li>{venue.name}</li>
            ))}
        </ul>
    }
}


