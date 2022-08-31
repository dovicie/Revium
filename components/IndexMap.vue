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
