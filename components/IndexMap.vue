<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
const center = { lat: 36.359335, lng: 138.590267 };
const ctx = useRuntimeConfig();
</script>

<template>
  <GoogleMap
    :api-key="ctx.apiKey"
    style="width: 100%; height: 240px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
