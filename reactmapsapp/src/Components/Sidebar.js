import React, { Component } from 'react';

class sidebar extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div id="sidebar">
                <input placeholder="Filter Content" value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }} />
                <br />
                {
                    this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue, index) => (
                        <div key={index} className="venue-item" onClick={() => { this.props.listItemClick(venue) }}>
                            {venue.name}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default sidebar;