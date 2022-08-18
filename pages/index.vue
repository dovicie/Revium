<script setup>
import { ref } from "vue";

const place = ref("");
const keyword = ref("");
const radius = ref("200m");
const isOpen = ref(true);
const genre = ref();

const searchPlace = () => {
  console.log(
    place.value,
    keyword.value,
    radius.value,
    genre.value,
    isOpen.value
  );
};
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
              <option>200m</option>
              <option>500m</option>
              <option>800m</option>
              <option>1km</option>
              <option>3km</option>
              <option>5km</option>
              <option>10km</option>
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
        <ul class="flex flex-wrap gap-2">
          <li class="genre-btn">レストラン</li>
          <li class="genre-btn">コーヒー</li>
          <li class="genre-btn">観光スポット</li>
          <li class="genre-btn">公園</li>
          <li class="genre-btn">ラーメン</li>
          <li class="genre-btn">動物園</li>
          <li class="genre-btn">居酒屋</li>
          <li class="genre-btn">ホテル</li>
          <li class="genre-btn">バー</li>
        </ul>
        <!-- <input type="checkbox" id="jack" value="Jack" v-model="genre" />
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames" />
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
        <label for="mike">Mike</label> -->
      </div>
      <div class="form-control">
        <label class="label cursor-pointer justify-center gap-2">
          <input type="checkbox" class="checkbox" v-model="isOpen" />
          <span class="label-text font-bold">営業中のスポットのみを表示</span>
        </label>
      </div>
      <button class="btn btn-secondary" @click="searchPlace()" type="submit">
        🔎 この条件で探す
      </button>
    </form>
  </div>
</template>
