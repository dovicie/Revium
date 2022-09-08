<script setup>
import { Loader } from "@googlemaps/js-api-loader";

const ctx = useRuntimeConfig();
const gmap = ref();

const props = defineProps({
  lat: Number,
  lng: Number,
});

onMounted(() => {
  const mapOptions = {
    center: {
      lat: +props.lat,
      lng: +props.lng,
    },
    zoom: 14,
  };

  const loader = new Loader({
    apiKey: ctx.apiKey,
    version: "weekly",
    libraries: ["places"],
  });

  loader
    .load()
    .then((google) => {
      const map = new google.maps.Map(gmap.value, mapOptions);

      const sydney = new google.maps.LatLng(35.7, 139.7);
      const infowindow = new google.maps.InfoWindow();

      const request = {
        location: sydney,
        radius: 800,
        type: ["restaurant"],
        keyword: "焼き肉",
        language: "ja",
      };
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            // createMarker(results[i]);
          }
          // map.setCenter(results[0].geometry.location);
        }
      });
    })
    .catch((e) => {
      // do something
    });
});

onUpdated(() => {
  const mapOptions = {
    center: {
      lat: +props.lat,
      lng: +props.lng,
    },
    zoom: 15,
  };

  const loader = new Loader({
    apiKey: ctx.apiKey,
    version: "weekly",
    libraries: ["places"],
  });

  loader
    .load()
    .then((google) => {
      const map = new google.maps.Map(gmap.value, mapOptions);
    })
    .catch((e) => {
      // do something
    });
});
</script>

<template>
  <div ref="gmap" class="h-[240px] w-full"></div>
</template>
