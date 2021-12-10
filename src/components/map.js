import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const m = () => {
    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
                <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            </MapContainer>
        </div>
    )
}

export default m;