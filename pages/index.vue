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
// const queryIsOpen = ref(false);
const queryGenres = ref([]);

const gmap = ref();
const map = ref();
const service = ref();

const lat = ref(35.658106);
const lng = ref(139.741364);

const placeList = ref([]);
const isVisibleSearchResult = ref(false);
const isVisibleLoading = ref(true);
const isEnptyHit = ref(false);
const isExistLatlng = ref(true);

const openSearchResult = () => {
  isVisibleSearchResult.value = true;
};

const closeSearchResult = () => {
  isVisibleSearchResult.value = false;
};

const showLoading = () => {
  isVisibleLoading.value = true;
};

const removeLoading = () => {
  return new Promise((resolve) => {
    resolve((isVisibleLoading.value = false));
  });
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
  isExistLatlng.value = true;
  return new Promise((resolve, reject) => {
    loader.load().then((google) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else if (status === "ZERO_RESULTS") {
          isExistLatlng.value = false;
          resolve(new google.maps.LatLng(999, 999));
        } else {
          reject(console.log(status));
        }
      });
    });
  });
};

// 新しい
const onClickSearch = async () => {
  // SearchResultを開く
  showLoading();
  openSearchResult();

  // 検索された場所の緯度経度取得
  const location = await getLocation(queryAddress.value);
  lat.value = location.lat();
  lng.value = location.lng();

  // マップ更新
  map.value = await updateMap(location);

  // 場所の取得
  const request = {
    location: location,
    radius: queryRadius.value,
    type: queryGenres.value,
    keyword: queryKeyword.value,
    language: "ja",
  };

  placeList.value = await searchPlaces(request);
  await removeLoading();
};

const updateMap = (latLng) => {
  return new Promise((resolve) => {
    loader.load().then((google) => {
      resolve(
        new google.maps.Map(gmap.value, {
          center: latLng,
          zoom: 14,
        })
      );
    });
  });
};

const searchPlaces = (request) => {
  let searchResults = new Array();
  isEnptyHit.value = false;
  return new Promise((resolve, reject) => {
    loader.load().then((google) => {
      service.value.nearbySearch(request, (results, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          searchResults = searchResults.concat(results);
          if (pagination.hasNextPage) {
            pagination.nextPage();
          } else {
            searchResults = searchResults.filter(
              (place) => !place.types.includes("locality")
            );
            resolve(searchResults);
          }
        } else if (
          status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
        ) {
          isEnptyHit.value = true;
          resolve(searchResults);
        } else {
          reject(console.log(status));
        }
      });
    });
  });
};

const getPlaceDetail = (placeId) => {
  return new Promise((resolve, reject) => {
    loader.load().then((google) => {
      service.value.getDetails({ placeId: placeId }, (result, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          resolve(result);
        } else {
          reject(status);
        }
      });
    });
  });
};
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
        @on-click-search="onClickSearch"
      />
    </div>

    <div v-else>
      <SearchResult
        :places="placeList"
        :is-visible-loading="isVisibleLoading"
        :is-exist-latlng="isExistLatlng"
        :is-enpty-hit="isEnptyHit"
        :get-place-detail="getPlaceDetail"
        @close="closeSearchResult"
      />
    </div>
  </div>
</template>
