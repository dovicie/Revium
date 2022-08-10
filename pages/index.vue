<template>
  <div class="p-2 flex flex-col gap-y-4">
    <div>
      <img
        src="https://www.axis-corp.com/blog/wp-content/uploads/2016/01/ee6470d628534090ef9a7eca7858aa53.png"
        alt=""
        class="object-cover w-full"
      />
    </div>

    <div>
      <h2 class="h2">🗻 場所</h2>
      <div class="flex flex-col sm:flex-row gap-y-2">
        <input
          type="text"
          placeholder="新宿駅"
          class="input input-bordered input-sm grow"
        />
        <div class="flex flex-row items-center justify-end gap-1">
          <p class="shrink-0">から</p>
          <select class="select select-bordered select-sm">
            <option disabled selected>200m</option>
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
      <h2 class="h2">🀄 キーワード</h2>
      <input
        type="text"
        placeholder=""
        class="input input-bordered w-full input-sm"
      />
    </div>
    <div>
      <h2 class="h2">🎯 ジャンル</h2>
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
    </div>
    <div class="form-control">
      <label class="label cursor-pointer justify-center gap-2">
        <input type="checkbox" checked="checked" class="checkbox" />
        <span class="label-text font-bold">営業中のスポットのみを表示</span>
      </label>
    </div>
    <button class="btn btn-secondary">🔎 この条件で探す</button>
  </div>
</template>
