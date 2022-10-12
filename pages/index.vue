<script setup>
import { ref, onMounted } from "vue";
import SearchForm from "~~/components/SearchForm.vue";
import SearchResult from "~~/components/SearchResult.vue";
import { Loader } from "@googlemaps/js-api-loader";
import { useRuntimeConfig } from "#app";

const ctx = useRuntimeConfig();

const queryAddress = ref("");
const queryKeyword = ref("");
const queryRadius = ref(200);
const queryIsOpen = ref(false);
const queryGenres = ref([]);

const gmap = ref();
const map = ref();
const service = ref();

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
      map.value = new google.maps.Map(gmap.value, {
        center: {
          lat: lat.value,
          lng: lng.value,
        },
        zoom: 14,
      });
      service.value = new google.maps.places.PlacesService(map.value);
    })
    .catch((e) => {
      console.log(e);
    });
});

const getLocation = (address) => {
  return new Promise((resolve, reject) => {
    loader.load().then((google) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          reject(status);
        }
      });
    });
  });
};

const getPlaces = async () => {
  const location = await getLocation(queryAddress.value);
  lat.value = location.lat();
  lng.value = location.lng();

  loader.load().then((google) => {
    const latLng = new google.maps.LatLng(lat.value, lng.value);
    map.value = new google.maps.Map(gmap.value, {
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

    let searchResults = new Array();
    service.value.nearbySearch(request, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        searchResults = searchResults.concat(results);
        if (pagination.hasNextPage) {
          pagination.nextPage();
        } else {
          searchResults = searchResults.filter(
            (place) => !place.types.includes("locality")
          );

          placeList.value = searchResults;
        }
      }
    });
  });
  openSearchResult();
};

//  ESLint no-unused-vars 回避

// const getPlaceDetail = (placeId) => {
// 	const request = {
// 		// placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
// 		placeId: placeId,
// 	};
// 	service.value.getDetails(request, (place, status) => {
// 		if (status == google.maps.places.PlacesServiceStatus.OK) {
// 			console.log(place);
// 		}
// 	});
// };
</script>

<template>
  <div class="p-2 flex flex-col gap-y-4">
    <div>
      <div ref="gmap" class="h-[240px] w-full"></div>
    </div>

    <div v-if="!isVisibleSearchResult">
      <SearchForm
        v-model:address="queryAddress"
        v-model:radius="queryRadius"
        v-model:keyword="queryKeyword"
        v-model:genres="queryGenres"
        v-model:isOpen="queryIsOpen"
        @get-places="getPlaces"
      />
    </div>

    <div v-else>
      <SearchResult :places="placeList" @close="closeSearchResult" />
    </div>
  </div>
</template>
