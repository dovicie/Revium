<template>
  <h1 class="">Index page</h1>
  <div class="">
    <button className="btn">BUTTON</button>
    <button className="btn btn-primary">PRIMARY</button>
    <button className="btn btn-secondary">SECONDARY</button>
    <button className="btn btn-accent">ACCENT</button>
    <button className="btn btn-ghost">GHOST</button>
    <button className="btn btn-link">LINK</button>
  </div>

  <div class="card card-side bg-base-100 shadow-xl">
    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
    <div class="card-body">
      <h2 class="card-title">New movie is released!</h2>
      <p>Click the button to watch on Jetflix app.</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Watch</button>
      </div>
    </div>
  </div>
  <div class="dropdown">
    <label tabindex="0" class="btn m-1">Click</label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>
  <select class="select w-full max-w-xs">
    <option disabled selected>Pick your favorite Simpson</option>
    <option>Homer</option>
    <option>Marge</option>
    <option>Bart</option>
    <option>Lisa</option>
    <option>Maggie</option>
  </select>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Remember me</span>
      <input type="checkbox" class="toggle toggle-primary" checked />
    </label>
  </div>
</template>
