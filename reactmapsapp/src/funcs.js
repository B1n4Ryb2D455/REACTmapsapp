export function load_google_maps() {
    return new Promise(function(resolve, reject) {

        window.resolveGoogleMapsPromise = function() {
            resolve(window.google);
            delete window.resolveGoogleMapsPromise;
        }

        const script = document.createElement("script");
        const API_KEY = 'AIzaSyBQowO9QXcPdkhyyemu370I_16x62BtX8k';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
    });
}

export function load_places() {
    let city = 'Kennedy Space Center';
    let query = 'sights';
    var apiURL = 'https://api.foursquare.com/v2/venues/explore?client_id=IZB4KA3CRYVCJJYZF1MJGU23KJLOY1LTWKSDEH5YGGZLYQZQ&client_secret=3W5RLNDW2OKJJH4HH0CGI5SHMPQXMU0F3CN02ZHRQYOMD0FM&v=20182507&limit=20&near=' + city + ' &query=' + query + '';
    return fetch(apiURL).then(resp => resp.json())
}