<script setup>
// import { GoogleMap, Marker } from "vue3-google-map";
// const center = { lat: 36.359335, lng: 138.590267 };
import { Loader } from "@googlemaps/js-api-loader";
const ctx = useRuntimeConfig();

const gmap = ref();

const lat = ref(34.60);
const lng = ref(135.52);

const loader = new Loader({
  apiKey: ctx.apiKey,
  version: "weekly",
  libraries: ["places"],
});

const mapOptions = {
  center: {
    lat: lat.value,
    lng: lng.value,
  },
  zoom: 15,
};

onMounted(() => {
  loader
    .load()
    .then((google) => {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          address: "新宿駅",
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //取得した緯度・経度を使って周辺検索
            var location = results[0].geometry.location;
            lat.value = location.lat();
            lng.value = location.lng();
          } else {
            // console.log("位置情報が取得できませんでした。");
          }
        }
      );
      var map = new google.maps.Map(gmap.value, mapOptions);
    })
    .catch((e) => {
      // do something
    });
});
</script>

<template>
  <!-- <GoogleMap
    :api-key="ctx.apiKey"
    style="width: 100%; height: 240px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap> -->
  <div ref="gmap" class="h-[500px] w-[800px]"></div>
</template>
