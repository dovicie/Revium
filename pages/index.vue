<script setup>
import { ref } from "vue";
import IndexMap from "../components/IndexMap.vue";
import { Loader } from "@googlemaps/js-api-loader";
const ctx = useRuntimeConfig();

const inputAddress = ref("");
const inputKeyword = ref("");
const inputRadius = ref(200);
const inputIsOpen = ref(true);
const inputGenre = ref([]);
const genreList = ref([
  {
    label: "飲食店",
    value: "food",
  },
  {
    label: "観光地",
    value: "tourist_attraction",
  },
  {
    label: "レストラン",
    value: "restaurant",
  },
  {
    label: "カフェ",
    value: "cafe",
  },
  {
    label: "公園",
    value: "park",
  },
  {
    label: "ショッピングモール",
    value: "shopping_mall",
  },
  {
    label: "バー",
    value: "bar",
  },
  {
    label: "宿泊施設",
    value: "lodging",
  },
]);

const gmap = ref();

const lat = ref(35.7062);
const lng = ref(139.6837);

const placeList = ref([]);
const sortedPlaceList = ref(
  placeList.value.sort((a, b) => {
    a.user_ratings_total < b.user_ratings_total ? -1 : 1;
  })
);

const loader = new Loader({
  apiKey: ctx.apiKey,
  version: "weekly",
  libraries: ["places"],
});

onMounted(() => {
  loader
    .load()
    .then((google) => {
      var map = new google.maps.Map(gmap.value, {
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
  const location = await getLocation(inputAddress.value);
  lat.value = location.lat();
  lng.value = location.lng();

  loader.load().then((google) => {
    const latLng = new google.maps.LatLng(lat.value, lng.value);
    var map = new google.maps.Map(gmap.value, {
      center: {
        lat: lat.value,
        lng: lng.value,
      },
      zoom: 14,
    });

    const request = {
      location: latLng,
      radius: inputRadius.value,
      type: inputGenre.value,
      keyword: inputKeyword.value,
      language: "ja",
    };
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        placeList.value = results;
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
          // createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
  });
};
</script>

<template>
  <div class="p-2 flex flex-col gap-y-4">
    <div>
      <div ref="gmap" class="h-[240px] w-full"></div>
    </div>

    <form class="flex flex-col gap-y-4" @submit.prevent="getPlaces">
      <div>
        <label class="h2">🗻 場所</label>
        <div class="flex flex-col sm:flex-row gap-y-2">
          <input
            v-model="inputAddress"
            type="text"
            placeholder="新宿駅"
            class="input input-bordered input-sm grow"
          />
          <div class="flex flex-row items-center justify-end gap-1">
            <p class="shrink-0">から</p>
            <select
              v-model="inputRadius"
              class="select select-bordered select-sm"
            >
              <option value="200">200m</option>
              <option value="500">500m</option>
              <option value="800">800m</option>
              <option value="1000">1km</option>
              <option value="3000">3km</option>
              <option value="5000">5km</option>
              <option value="10000">10km</option>
            </select>
            <p class="shrink-0">圏内</p>
          </div>
        </div>
      </div>
      <div>
        <label class="h2">🀄 キーワード</label>
        <input
          v-model="inputKeyword"
          type="text"
          placeholder=""
          class="input input-bordered w-full input-sm"
        />
      </div>
      <div>
        <label class="h2">🎯 ジャンル</label>
        <div class="flex flex-wrap gap-2">
          <div v-for="genreItem in genreList" :key="genreItem">
            <input
              type="checkbox"
              :id="genreItem.value"
              :value="genreItem.value"
              v-model="inputGenre"
              class="genre-checkbox"
            />
            <label :for="genreItem.value" class="genre-btn">{{
              genreItem.label
            }}</label>
          </div>
        </div>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer justify-center gap-2">
          <input type="checkbox" class="checkbox" v-model="inputIsOpen" />
          <span class="label-text font-bold">営業中のスポットのみを表示</span>
        </label>
      </div>
      <button class="btn btn-secondary" type="submit">🔎 この条件で探す</button>
    </form>
    <div class="flex flex-col flex-wrap gap-y-2">
      <div v-for="place in placeList" :key="place" class="p-2 gap-y-2 bg-white">
        <div class="flex items-center gap-x-2">
          <p class="font-bold">
            <span class="text-xl text-secondary">{{
              place.user_ratings_total || 0
            }}</span>
            件
          </p>
          <p class="text-xs" v-if="place.rating">
            <span class="text-accent">★</span>{{ place.rating }}
          </p>
        </div>
        <p class="font-bold text-2xl">{{ place.name }}</p>
        <div class="flex flex-wrap gap-2 text-xs">
          <div v-for="typ in place.types" :key="typ">
            {{ typ }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
