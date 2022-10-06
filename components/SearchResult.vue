<script setup>
import SearchResultItem from '~~/components/SearchResultItem.vue';

const props = defineProps({
	places: Array,
});

const emit = defineEmits(['close']);

const sortedPlaces = computed(() => {
	return props.places.sort((a, b) => {
		return b.user_ratings_total - a.user_ratings_total;
	});
});
</script>

<template>
	<div class="flex flex-col flex-wrap gap-y-2">
		<SearchResultItem
			v-for="place in sortedPlaces"
			:key="place"
			:img="place.photos ? place.photos[0].getUrl() : ''"
			:ratings-total="place.user_ratings_total"
			:rating="place.rating"
			:name="place.name"
			:types="place.types"
		/>
	</div>
	<div class="h-16" />
	<div
		class="fixed bottom-0 left-0 py-2 w-full flex justify-center items-center gap-x-2 bg-white"
	>
		<div class="font-bold">
			<span class="text-2xl text-secondary">{{
				props.places.length
			}}</span>
			件
		</div>
		<button class="btn btn-primary" @click="$emit('close')">
			🔎 条件を選び直す
		</button>
	</div>
</template>
