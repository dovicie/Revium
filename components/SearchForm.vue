<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  address: String,
  keyword: String,
  radius: Number,
  isOpen: Boolean,
  genres: Array,
});

const emit = defineEmits([
  "onClickSearch",
  "update:address",
  "update:keyword",
  "update:radius",
  "update:isOpen",
  "update:genres",
]);

const addressComputed = computed({
  get: () => props.address,
  set: (value) => {
    emit("update:address", value);
  },
});
const keywordComputed = computed({
  get: () => props.keyword,
  set: (value) => {
    emit("update:keyword", value);
  },
});
const radiusComputed = computed({
  get: () => props.radius,
  set: (value) => {
    emit("update:radius", parseInt(value));
  },
});
const isOpenComputed = computed({
  get: () => props.isOpen,
  set: (value) => {
    emit("update:isOpen", value);
  },
});
const genresComputed = computed({
  get: () => props.genres,
  set: (value) => {
    emit("update:genres", value);
  },
});

const genreList = ref([
  {
    label: "レストラン",
    value: "restaurant",
  },
  {
    label: "観光地",
    value: "tourist_attraction",
  },
  {
    label: "カフェ",
    value: "cafe",
  },
  {
    label: "ショッピングモール",
    value: "shopping_mall",
  },
  {
    label: "公園",
    value: "park",
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
</script>

<template>
  <form class="flex flex-col gap-y-4" @submit.prevent="$emit('onClickSearch')">
    <div>
      <label class="h2">🗻 場所<span class="text-xs">（必須）</span></label>
      <div class="flex flex-col sm:flex-row gap-y-2">
        <input
          v-model="addressComputed"
          type="text"
          placeholder="新宿駅"
          class="input input-bordered input-sm grow"
          required
        />
        <div class="flex flex-row items-center justify-end gap-1">
          <p class="shrink-0">から</p>
          <select
            v-model="radiusComputed"
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
        v-model="keywordComputed"
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
            :id="genreItem.value"
            v-model="genresComputed"
            type="checkbox"
            :value="genreItem.value"
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
        <input v-model="isOpenComputed" type="checkbox" class="checkbox" />
        <span class="label-text font-bold">営業中のスポットのみを表示</span>
      </label>
    </div>
    <button class="btn btn-secondary" type="submit">🔎 この条件で探す</button>
  </form>
</template>
