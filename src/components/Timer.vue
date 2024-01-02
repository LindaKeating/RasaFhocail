<template>
  <div class="Timer">
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.Timer {
  font-size: 500%; /* 1 */
  width: 10rem; /* 1 */
  height: 10rem; /* 1 */
  border-radius: 50%; /* 1 */
  position: relative; /* 2 */
  border: 0.05em dotted var(--color); /* 3 */
  --color: deeppink; /* 4 */
}

.Timer::before,
.Timer::after {
  content: '';
  width: 53%; /* 1 */
  height: 106%; /* 1 */
  border-radius: 5rem 0 0 5rem; /* 1 */
  //border: 0.06em solid red; /* 3 */
  //outline: 0.06em solid red;
  outline-offset: -0.06em;
  position: absolute; /* 2 */
  left: -0.05em; /* 2 */
  top: -0.05em;
  transform-origin: center right; /* 3 */
}

/**
 * 1. Put the masking pseudo-element on top.
 */
.Timer::before {
  width: 50%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1; /* 1 */
  background-color: #4c4073; /* 1 */
  border: none;
}

/**
 * 1. Give the spinning pseudo-element the pie color.
 */
.Timer::after {
  background-color: var(--color); /* 1 */
}

.Timer::before,
.Timer::after {
  animation-duration: 240s; /* 1 */
  animation-iteration-count: infinite; /* 1 */
}

/**
 * 1. We want the animation to have a single step halfway through.
 */
.Timer::before {
  animation-name: mask;
  animation-timing-function: steps(1); /* 1 */
}

/**
 * 1. Make sure the rotationg is linear for the effort to work.
 */
.Timer::after {
  animation-name: rotate;
  animation-timing-function: linear; /* 1 */
}

@keyframes mask {
  50%,
  100% {
    background-color: var(--color);
    transform: rotate(0.5turn);
  }
}

@keyframes rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>