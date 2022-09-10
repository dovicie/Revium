<script setup>
import { ref } from "vue";
import IndexMap from "../components/IndexMap.vue";
import { Loader } from "@googlemaps/js-api-loader";
const ctx = useRuntimeConfig();

const place = ref("");
const keyword = ref("");
const radius = ref(200);
const isOpen = ref(true);
const genre = ref([]);
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

const geocoding = () => {
  loader
    .load()
    .then((google) => {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          address: place.value,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //取得した緯度・経度を使って周辺検索
            var location = results[0].geometry.location;
            lat.value = location.lat();
            lng.value = location.lng();
          } else {
            console.log("位置情報が取得できませんでした。");
          }
        }
      );
    })
    .catch((e) => {
      // do something
    });
};

const searchPlace = () => {
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
      radius: radius.value,
      type: genre.value,
      keyword: keyword.value,
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
  });
};
</script>

<template>
  <div class="p-2 flex flex-col gap-y-4">
    <div>
      <!-- <IndexMap :lat="lat" :lng="lng" /> -->
      <div ref="gmap" class="h-[240px] w-full"></div>
    </div>

    <form class="flex flex-col gap-y-4" @submit.prevent="searchPlace">
      <div>
        <label class="h2">🗻 場所</label>
        <div class="flex flex-col sm:flex-row gap-y-2">
          <input
            v-model="place"
            type="text"
            placeholder="新宿駅"
            class="input input-bordered input-sm grow"
          />
          <div class="flex flex-row items-center justify-end gap-1">
            <p class="shrink-0">から</p>
            <select v-model="radius" class="select select-bordered select-sm">
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
          v-model="keyword"
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
              v-model="genre"
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
          <input type="checkbox" class="checkbox" v-model="isOpen" />
          <span class="label-text font-bold">営業中のスポットのみを表示</span>
        </label>
      </div>
      <button class="btn btn-secondary" type="submit">🔎 この条件で探す</button>
    </form>
  </div>
</template>
