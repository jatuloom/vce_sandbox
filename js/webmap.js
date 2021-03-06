/*
jtl 10/11/2018
Leaflet experiment.
Goals:
- load wms from BISON and display over Leaflet (check)
- load iNat ocurrence location data as an array of points with data (check)
- load wms from GBIF and display as Leaflet layer
- separate back-ends into separate modules and import into central js manager
- respond to a click over a point on a wms overlay and retrieve data
*/

import {getInatOccCanvas} from "./occInatMap.js";
import {getBisonWmsOverlay} from "./wmsBisonMap.js";
import {getGbifTile} from "./occGbifTileMap.js";

//USGS BISON wms coordinate system is only EPSG:3857
var llCenter = [43.6962, -72.3197];
var myMap = {};
var wmsBison = false; //flag to show a Bison WMS overlay map
var occInat = false; //flag to show an iNat JSON Occurrence vector map
var occGbifTile = true;

function addMap() {
    myMap = L.map('mapid', {
            center: llCenter,
            zoom: 12,
            crs: L.CRS.EPSG3857
        });
   
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 20,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(myMap);
}

function addMarker() {
    var marker = L.marker([43.6962, -72.3197]).addTo(myMap);
    marker.bindPopup("<b>Vermont Center for Ecostudies</b>").openPopup();
}

function getData() {
    if (wmsBison) {getBisonWmsOverlay(myMap);}
    if (occInat) {getInatOccCanvas(myMap);}
    if (occGbifTile) {getGbifTile(myMap);}
}

addMap();
addMarker();

myMap.on('load', function () {
    if (wmsBison) {getBisonWmsOverlay(myMap);}
    if (occInat) {getInatOccCanvas(myMap);}
    //if (occGbifTile) {getGbifTile(myMap);}
});
myMap.on('zoomend', function () {
    if (wmsBison) {getBisonWmsOverlay(myMap);}
    if (occInat) {getInatOccCanvas(myMap);}
    //if (occGbifTile) {getGbifTile(myMap);}
});
myMap.on('moveend', function () {
    if (wmsBison) {getBisonWmsOverlay(myMap);}
    if (occInat) {getInatOccCanvas(myMap);}
    //if (occGbifTile) {getGbifTile(myMap);}
});

getData();