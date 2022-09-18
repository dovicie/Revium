<script setup>
const props = defineProps({
  imgUrl: String,
  ratingTotal: Number,
  rating: Number,
  name: String,
  genres: Array,
});
</script>

<template>
  <div class="p-2 flex flex-col gap-y-2 bg-white">
    <img :src="props.imgUrl" alt="" class="aspect-[4/3] object-cover" />
    <div class="flex items-center gap-x-2">
      <p class="font-bold">
        <span class="text-xl text-secondary">{{ props.ratingTotal || 0 }}</span>
        件
      </p>
      <p class="text-xs" v-if="props.rating">
        <span class="text-accent">★</span>{{ props.rating }}
      </p>
    </div>
    <p class="font-bold text-2xl">{{ props.name }}</p>
    <div class="flex flex-wrap gap-2 text-xs">
      <div v-for="genre in props.genres" :key="genre">
        {{ genre }}
      </div>
    </div>
  </div>
</template>
