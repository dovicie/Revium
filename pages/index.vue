<script setup>
import { ref } from "vue";
import SearchForm from "~~/components/SearchForm.vue";
import SearchResult from "~~/components/SearchResult.vue";
import { Loader } from "@googlemaps/js-api-loader";
const ctx = useRuntimeConfig();

const queryAddress = ref("");
const queryKeyword = ref("");
const queryRadius = ref(800);
const queryIsOpen = ref(false);
const queryGenres = ref([]);

const gmap = ref();

const lat = ref(35.658106);
const lng = ref(139.741364);

const placeList = ref([]);
const isVisibleSearchResult = ref(false);

const openSearchResult = () => {
  isVisibleSearchResult.value = true;
};

const closeSearchResult = () => {
  isVisibleSearchResult.value = false;
};

const loader = new Loader({
  apiKey: ctx.apiKey,
  version: "weekly",
  libraries: ["places"],
});

onMounted(() => {
  loader
    .load()
    .then((google) => {
      const map = new google.maps.Map(gmap.value, {
        center: {
          lat: lat.value,
          lng: lng.value,
        },
        zoom: 14,
      });
    })
    .catch((e) => {
      // do something
    });
});

const getLocation = (address) => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        resolve(results[0].geometry.location);
      } else {
        reject(status);
      }
    });
  });
};

const getPlaces = async () => {
  const location = await getLocation(queryAddress.value);
  lat.value = location.lat();
  lng.value = location.lng();

  loader.load().then((google) => {
    const latLng = new google.maps.LatLng(lat.value, lng.value);
    const map = new google.maps.Map(gmap.value, {
      center: {
        lat: lat.value,
        lng: lng.value,
      },
      zoom: 14,
    });

    const request = {
      location: latLng,
      radius: queryRadius.value,
      type: queryGenres.value,
      keyword: queryKeyword.value,
      language: "ja",
    };
    let placesList = new Array();
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        placesList = placesList.concat(results);
        if (pagination.hasNextPage) {
          setTimeout(pagination.nextPage(), 1);
        } else {
          placeList.value = placesList;
        }
      }
    });
  });
  openSearchResult();
};
</script>

<template>
  <div class="p-2 flex flex-col gap-y-4">
    <div>
      <div ref="gmap" class="h-[240px] w-full"></div>
    </div>

    <div v-if="!isVisibleSearchResult">
      <SearchForm
        @getPlaces="getPlaces"
        v-model:address="queryAddress"
        v-model:radius="queryRadius"
        v-model:keyword="queryKeyword"
        v-model:genres="queryGenres"
        v-model:isOpen="queryIsOpen"
      />
    </div>

    <div v-else>
      <SearchResult :places="placeList" @close="closeSearchResult" />
    </div>
  </div>
</template>
