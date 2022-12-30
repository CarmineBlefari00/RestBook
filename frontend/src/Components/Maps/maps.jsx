import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {FullscreenControl, GeolocateControl, Marker, NavigationControl} from "react-map-gl";

const lng="39.35334881289762";
const lat="16.24157048264637";

function maps(){
    return(
        <div className='mappa'>
            <Map
            mapboxAccessToken='pk.eyJ1IjoibWF0dGVvc3BvcnRlbGxpIiwiYSI6ImNsYXYzMmJqbDAxdXQzcm1wZjBkbW53ZHcifQ.4xFih1yVT6FkB5q3f-cJKQ'
            style={{
                width:"500px",
                height:"500px",
                borderRadius:"15px",
                border:"2px solid red"
            }}
            initialViewState={{
                longitude: lng,
                latitude: lat,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            >
            <Marker Longitude={lng} Latitudine={lat} />
            <NavigationControl position='bottom-right' />
            <FullscreenControl/>
            <GeolocateControl/>
            </Map>
        </div>
    );
}

export default maps;