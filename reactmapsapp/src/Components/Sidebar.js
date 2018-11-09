import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';

class sidebar extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <ErrorBoundary>
                <sidebar id="sidebar">
                    <form>
                        <label class="search-label" htmlFor="search"> Search: </label>
                        <input id="search" type="text" placeholder="Places to See" value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }} />
                    </form>


                    <br />
                    {
                        this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue, index) => (
                            <div key={index} className="venue-item" tabIndex={0} onClick={() => { this.props.listItemClick(venue) }}>
                                {venue.name}
                            </div>
                        ))
                    }
                </sidebar>
            </ErrorBoundary>
        )
    }
}

export default sidebar;