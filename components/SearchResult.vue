<script setup>
const props = defineProps({
  places: Array,
});

const emit = defineEmits(["close"]);

const sortedPlaces = computed(() => {
  return props.places.sort((a, b) => {
    return b.user_ratings_total - a.user_ratings_total;
  });
});
</script>

<template>
  <div class="flex flex-col flex-wrap gap-y-2">
    <div
      v-for="place in sortedPlaces"
      :key="place"
      class="p-2 flex flex-col gap-y-2 bg-white"
    >
      <img
        :src="place.photos[0].getUrl()"
        alt=""
        class="aspect-[4/3] object-cover"
      />
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
  <div
    class="fixed bottom-0 py-2 w-full flex justify-center items-center gap-x-2 bg-white"
  >
    <div class="font-bold">
      <span class="text-2xl text-secondary">10</span>
      件
    </div>
    <button class="btn btn-primary" @click="$emit('close')">
      🔎 条件を選び直す
    </button>
  </div>
</template>
