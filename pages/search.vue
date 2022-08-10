<script setup>
import SearchItem from "~~/components/SearchItem.vue";
</script>

<template>
  <div class="p-2 flex flex-col gap-y-4">
    <div>
      <img
        src="https://www.axis-corp.com/blog/wp-content/uploads/2016/01/ee6470d628534090ef9a7eca7858aa53.png"
        alt=""
        class="object-cover w-full"
      />
    </div>
    <SearchItem />
    <SearchItem />
  </div>
  <div class="flex justify-center items-center gap-2 py-2 bg-white">
    <div><span class="text-secondary text-xl font-bold">149</span>件</div>
    <button class="btn btn-primary">🔎 条件を選び直す</button>
  </div>
</template>
