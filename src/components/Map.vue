<template>
  <div id="map"></div>
</template>

<script>
import { onMounted, watch, ref } from "vue";
import { useState } from '@/state.js';
import { toGeo } from '@/mapGeoMapper'

export default {
  setup() {
    const map = ref({});

    const loadMap = () => {
      map.value = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: { lat: 3, lng: 38 },
        mapTypeId: "terrain"
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
    };

    const script = document.createElement('script');
    script.onload = loadMap;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_API_KEY}`;
    document.head.appendChild(script);

    const state = useState();
    watch(state.day, () => {
      if(Object.keys(map.value).length > 0){
        const featureCollection = {
          type: "FeatureCollection",
          features: state.day.value.data.map(toGeo).filter(g => g),
        }
        map.value.data.addGeoJson(featureCollection)
      }
    })

    return { };
  }
};

const getOpacity = mag => {
  const o = 0.16 * mag ** 0.12;
  return Math.max(Math.min(o, 1), 0.2);
}

const getScale = mag => 4.6 * mag ** 0.2

</script>

<style scoped>
#map{
  flex: 1;
}
</style>
