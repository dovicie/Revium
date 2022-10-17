<script setup>
import SearchResultItem from "~~/components/SearchResultItem.vue";
import { computed } from "vue";

const props = defineProps({
  places: Array,
  isVisibleLoading: Boolean,
  isExistLatlng: Boolean,
  isEnptyHit: Boolean,
  getPlaceDetail: Function,
});

defineEmits(["close"]);

const sortRatingTotal = (array) => {
  return array.sort((a, b) => {
    return b.user_ratings_total - a.user_ratings_total;
  });
};

const sortedPlaces = computed(() => {
  return sortRatingTotal(props.places);
});
</script>

<template>
  <div
    v-if="props.isVisibleLoading"
    class="flex justify-center items-center h-[calc(100vh-400px)]"
  >
    <img src="assets/loading.svg" alt="" width="32" />
  </div>
  <div
    v-else-if="!props.isExistLatlng"
    class="flex flex-col justify-center items-center h-[calc(100vh-400px)]"
  >
    <p class="font-bold">場所が見つかりません🙇‍♂️</p>
  </div>
  <div
    v-else-if="props.isEnptyHit"
    class="flex flex-col justify-center items-center h-[calc(100vh-400px)]"
  >
    <p class="font-bold">
      検索結果が<span class="text-2xl text-secondary px-1">0</span>件です🙇‍♂️
    </p>
  </div>
  <div v-else class="flex flex-col flex-wrap gap-y-2">
    <SearchResultItem
      v-for="place in sortedPlaces"
      :key="place"
      :img="place.photos ? place.photos[0].getUrl() : ''"
      :ratings-total="place.user_ratings_total"
      :rating="place.rating"
      :name="place.name"
      :place-id="place.place_id"
      :get-place-detail="props.getPlaceDetail"
    />
  </div>
  <div class="h-16"></div>
  <div
    class="fixed bottom-0 left-0 py-2 w-full flex justify-center items-center gap-x-2 bg-white"
  >
    <div class="font-bold">
      <span class="text-2xl text-secondary">{{
        props.isVisibleLoading ? "--" : props.places.length
      }}</span>
      件
    </div>
    <button class="btn btn-primary" @click="$emit('close')">
      🔎 条件を選び直す
    </button>
  </div>
</template>
