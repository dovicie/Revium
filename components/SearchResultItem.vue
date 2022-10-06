<script setup>
const props = defineProps({
	img: String,
	ratingsTotal: Number,
	rating: Number,
	name: String,
	types: Array,
});
</script>

<template>
	<div class="p-2 flex flex-col gap-y-2 bg-white">
		<div v-if="props.img">
			<img
				:src="props.img"
				alt=""
				class="aspect-[4/3] object-cover rounded"
			/>
		</div>
		<div class="flex items-center gap-x-2">
			<p class="font-bold">
				<span class="text-xl text-secondary">{{
					props.ratingsTotal || 0
				}}</span>
				件
			</p>
			<p v-if="props.rating" class="text-xs">
				<span class="text-accent">★</span>{{ props.rating }}
			</p>
		</div>
		<p class="font-bold text-2xl">
			{{ props.name }}
		</p>
		<div class="flex flex-wrap gap-2 text-xs">
			<div v-for="typ in props.types" :key="typ">
				{{ typ }}
			</div>
		</div>
	</div>
</template>
