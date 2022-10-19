<script setup>
const props = defineProps({
  img: String,
  ratingsTotal: Number,
  rating: Number,
  name: String,
  placeId: String,
  getPlaceDetail: Function,
});

const getDetail = (placeId) => {
  console.log(props.getPlaceDetail(placeId));
};
</script>

<template>
  <div class="p-2 flex flex-col gap-y-2 bg-white w-full">
    <div v-if="props.img">
      <img :src="props.img" alt="" class="aspect-[4/3] object-cover rounded" />
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
    <button @click="getDetail(props.placeId)">もっと見る ⬇</button>
    <div class="border-t-2 border-base-100"></div>
    <div class="flex flex-col gap-y-2">
      <div class="flex items-center gap-x-4">
        <img src="assets/icon-gmap.png" alt="" class="w-5" />
        <div class="text-base">
          <a
            href="https://maps.google.com/?cid=15660008059539130677"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          >
            Google Mapで見る
          </a>
        </div>
      </div>
      <div class="flex items-center gap-x-4">
        <img src="assets/icon-website.png" alt="" class="w-5" />
        <div
          class="text-base overflow-hidden text-ellipsis whitespace-normal w-full"
        >
          <a
            href="http://www.town.karuizawa.lg.jp/"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          >
            http://www.town.karuizawa.lg.jppppppppppppppppppppp/
          </a>
        </div>
      </div>
      <div class="flex items-center gap-x-4">
        <img src="assets/icon-watch.png" alt="" class="w-5" />
        <div class="text-base text-success-content">営業中</div>
        <img src="assets/icon-down-arrow.svg" alt="" class="w-4" />
      </div>
      <div class="flex items-center gap-x-4">
        <img src="assets/icon-phone.png" alt="" class="w-5" />
        <div class="text-base">
          <a href="tel:090-1234-5678" class="link">090-1234-5678</a>
        </div>
      </div>
    </div>
    <div class="border-t-2 border-base-100"></div>
    <div class="carousel">
      <div class="carousel-item w-[120px] mr-2">
        <img
          src="https://placeimg.com/400/300/arch"
          alt="Burger"
          class="aspect-[4/3] object-cover rounded"
        />
      </div>
      <div class="carousel-item w-[120px] mr-2">
        <img
          src="https://placeimg.com/400/300/arch"
          alt="Burger"
          class="aspect-[4/3] object-cover rounded"
        />
      </div>
      <div class="carousel-item w-[120px] mr-2">
        <img
          src="https://placeimg.com/400/300/arch"
          alt="Burger"
          class="aspect-[4/3] object-cover rounded"
        />
      </div>
    </div>
    <div class="border-t-2 border-base-100"></div>
    <div class="flex flex-col gap-y-2">
      <div class="flex flex-col gap-y-1 text-xs">
        <div class="flex items-center gap-x-2">
          <img
            src="https://lh3.googleusercontent.com/a-/ACNPEu904KDCHHpE1dM1rAidxqN3WpOM2u-jaSBU6H5NeQ=s128-c0x00000000-cc-rp-mo-ba5"
            alt=""
            width="24"
          />
          <div>Hayato</div>
        </div>
        <div class="flex items-center gap-x-2">
          <div>3ヶ月前</div>
          <div><span class="text-accent">★</span>4.5</div>
        </div>
        <div class="text-sm">
          有料道路を通りますが夏にお薦めの場所です。入口にはトイレや売店もあり、本数が少ないですがバスでも一応行けます。駐車場は道沿いに有り。岩の地層から水が出てきて、木陰だし、この一帯はとても涼しいです。透明な水は冷たくて爽やか。ただ迂回路の無い一本道なので、時間帯で凄く混みます。
        </div>
      </div>
      <div class="flex flex-col gap-y-1 text-xs">
        <div class="flex items-center gap-x-2">
          <img
            src="https://lh3.googleusercontent.com/a-/ACNPEu904KDCHHpE1dM1rAidxqN3WpOM2u-jaSBU6H5NeQ=s128-c0x00000000-cc-rp-mo-ba5"
            alt=""
            width="24"
          />
          <div>Hayato</div>
        </div>
        <div class="flex items-center gap-x-2">
          <div>3ヶ月前</div>
          <div><span class="text-accent">★</span>4.5</div>
        </div>
        <div class="text-sm">
          有料道路を通りますが夏にお薦めの場所です。入口にはトイレや売店もあり、本数が少ないですがバスでも一応行けます。駐車場は道沿いに有り。岩の地層から水が出てきて、木陰だし、この一帯はとても涼しいです。透明な水は冷たくて爽やか。ただ迂回路の無い一本道なので、時間帯で凄く混みます。
        </div>
      </div>
    </div>
  </div>
</template>
