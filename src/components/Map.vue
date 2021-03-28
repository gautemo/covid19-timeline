<template>
  <div id="map"></div>
</template>

<script>
import { onMounted, watch, ref } from "vue";
import { useState } from '@/state.js';
import { toGeo } from '@/mapGeoMapper'
import { getCountry } from '@/countries'
import { getArrowText } from '@/arrows.js';

export default {
  setup() {
    const map = ref({});
    const info = ref({})
    const circles = ref([]);

    const loadMap = () => {
      map.value = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: { lat: 3, lng: 38 },
        styles: darkMapStyle,
      });

      map.value.data.setStyle(feature => {
          var magnitude = feature.getProperty('mag');
          return {
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: 'red',
              fillOpacity: getOpacity(magnitude),
              scale: getScale(magnitude),
              strokeColor: 'white',
              strokeWeight: .5
            }
          };
        });

      info.value = new google.maps.InfoWindow({})
      map.value.data.addListener('click', (mapEvent) => openInfoWindow(mapEvent))
      paintCircles(state.day)
    };

    const script = document.createElement('script');
    script.onload = loadMap;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_API_KEY}`;
    document.head.appendChild(script);

    const state = useState();

    const openInfoWindow = mapEvent => {   
      info.value.setPosition(mapEvent.latLng);
      info.value.country = mapEvent.feature.j;
      updateInfoWindow(mapEvent.feature.j)
      info.value.open(map.value)
    }

    const updateInfoWindow = country => {
      const incident = state.day.value.data.find(i => i.country === country);
      if(!incident){
        info.value.close();
        return;
      }
      const total = parseInt(incident.cases) || 0;
      let recovered
      if(state.simulateRecovered.value){
        recovered = incident.estimateRecovered || 0;
      }else{
        recovered = parseInt(incident.recovered) || 0;
      }
      const deaths = parseInt(incident.deaths) || 0;
      const current = total - recovered - deaths;

      let prevIncident = state.prevDay.value.find(i => i.country === country);
      if(!prevIncident){
        prevIncident = {
          cases: 0,
          deaths: 0,
          recovered: 0,
        }
      }
      const prevTotal = parseInt(prevIncident.cases) || 0;
      let prevRecovered
      if(state.simulateRecovered.value){
        prevRecovered = prevIncident.estimateRecovered || 0;
      }else{
        prevRecovered = parseInt(prevIncident.recovered) || 0;
      }
      const prevDeaths = parseInt(prevIncident.deaths) || 0;
      const prevCurrent = prevTotal - prevRecovered - prevDeaths;      

      const { name } = getCountry(country);
      info.value.setContent(`
        <h2 class="info-box">${name}</h2>
        <p class="info-box">Current Infected: <span class="red">${format(current)}</span> ${getArrowText(prevCurrent, current, true)}</p>
        <p class="info-box">Cases: ${format(total)} ${getArrowText(prevTotal, total, true)}</p>
        <p class="info-box">Recovered: ${format(recovered)} ${getArrowText(prevRecovered, recovered, true, true)}</p>
        <p class="info-box">Deaths: ${format(deaths)} ${getArrowText(prevDeaths, deaths, true)}</p>
      `);
    }

    const paintCircles = () => {
      circles.value.forEach(c => c.setGeometry(null));
      if(Object.keys(map.value).length > 0){
        const featureCollection = {
          type: "FeatureCollection",
          features: state.day.value.data.map(i => toGeo(i, state.simulateRecovered.value)).filter(g => g),
        }
        circles.value = map.value.data.addGeoJson(featureCollection)
      }
      if(info.value.country){
        updateInfoWindow(info.value.country)
      }
    }

    watch([state.day, state.simulateRecovered], () => {
      paintCircles()
    })

    return { };
  }
};

const format = num => new Intl.NumberFormat().format(num)

const getOpacity = mag => {
  const o = 0.01 * mag ** 0.32;
  return Math.max(Math.min(o, 1), 0.2);
}

const getScale = mag => Math.max(1.1 * mag ** 0.27, 2)

const darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#3e5c76"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];

</script>

<style scoped>
#map{
  flex: 1;
}

#map ::v-deep(.info-box){
  margin: 5px 0;
  display: flex;
  align-items: center;
}

#map ::v-deep(.info-box .red){
  border-bottom: 2px solid #d21921;
  border-radius: 1px;
}

#map ::v-deep(.info-box .color-red){
  color: #d21921;
}

#map ::v-deep(.info-box .color-green){
  color: #159c33;
}
</style>
