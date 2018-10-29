var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.5728722, lng: -80.6489808 },
        scrollwhell: true,
        zoom: 10
    });
}