import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';

class Map extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <ErrorBoundary>
                <main id="map">
                </main>
            </ErrorBoundary>
        )

    }
}

export default Map;