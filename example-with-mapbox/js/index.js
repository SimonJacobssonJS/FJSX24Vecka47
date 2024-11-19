const MAPBOX_API_TOKEN = 'pk.eyJ1Ijoiam9oYW5raXZpIiwiYSI6ImNrcnl6M25xMDA4aWUyd3BqY3EzYnA1NTEifQ.ve5rEn8ZDwUGKvphMkEdpw';
const RESEROBOT_API_TOKEN = '6eed25e3-36cd-4187-8183-c981940eebbd';
const BASE_URL = 'https://api.resrobot.se/v2.1/';

const buttonElem = document.querySelector('#position-button');
const stationsElem = document.querySelector('#stations');

function createDepartureItem(stopName, departure) {
    const itemElem = document.createElement('article');
    itemElem.classList.add('departure');
    itemElem.innerHTML = `
        <header><h4>${stopName}</h4></header>
        <p><span>Linje:</span> ${departure.name} - Mot ${departure.direction }</p>
        <p><span>Tid:</span> ${departure.time}</p>
    `;
    stationsElem.append(itemElem);
}

function showTimeTable(stopName, timetable) {
    stationsElem.innerHTML = '';

    for(let i = 0; i <= 10; i++) {
        createDepartureItem(stopName, timetable[i]);
    }
}

function createMarker(location, map) {
    const marker = new mapboxgl.Marker().
    setLngLat([location.lon, location.lat]).
    addTo(map);

    marker.getElement().addEventListener('click', async () => {
        console.log(location);
        const timetable = await getTimetable(location.extId);

        console.log(timetable);

        showTimeTable(location.name, timetable);
    });
}

function showOnMap(coords, nearbyStops) {
    mapboxgl.accessToken = MAPBOX_API_TOKEN;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coords.longitude, coords.latitude],
        zoom: 13
    });

    for(const stop of nearbyStops) {
        createMarker(stop.StopLocation, map);
    }
}

async function getNearbyStops(coords) {
    const url = `${BASE_URL}location.nearbystops?format=json&accessId=${RESEROBOT_API_TOKEN}&originCoordLat=${coords.latitude}&originCoordLong=${coords.longitude}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    return data;
}

async function getTimetable(stopId) {
    const url = `${BASE_URL}departureBoard?format=json&accessId=${RESEROBOT_API_TOKEN}&id=${stopId}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    return data.Departure;
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position);
            const nearbyStops = await getNearbyStops(position.coords);
            showOnMap(position.coords, nearbyStops.stopLocationOrCoordLocation);
        });
     }
}

getUserLocation();