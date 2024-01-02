<script setup>
  const { isBurgerActive } = defineProps({
	  isBurgerActive: {
	  	type: Boolean
	  },
    toggle: {
      type: Function
    }
  })
</script>
<template>
  <div id="Burger"
  class="Burger"
  :class="{ 'Burger-Active' : isBurgerActive }"
  @click.prevent="toggle">
  <slot>
    <button type="button" class="Burger-Button" title="Menu">
        <span class="Burger-Bar Burger-Bar--1"></span>
        <span class="Burger-Bar Burger-Bar--2"></span>
        <span class="Burger-Bar Burger-Bar--3"></span>
    </button>
   </slot>
  </div>
</template>
<style lang="scss" scoped>
.hidden {
  visibility: hidden;
}

.Burger-Button {
    cursor: pointer;
    position: relative;
    height: 30px;
    width: 32px;
    display: block;
    z-index: 999;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    pointer-events: all;
    transition: transform .6s cubic-bezier(.165,.84,.44,1);

    &:focus {
      outline: 0;
    }
}
.Burger-Bar {
  background-color: #130f40;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
}

.Burger-Bar--1 {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
}
.Burger-Bar--2 {
    transform-origin: 100% 50%;
    transform: scaleX(.8);
}
.Burger-Button:hover .Burger-Bar--2 {
    transform: scaleX(1);
}

.No-Touchevents .Burger-Bar--2:hover {
    transform: scaleX(1);
}

.Burger-Bar--3 {
    transform: translateY(6px);
}

.Burger.active .burger-button {
  transform: rotate(-180deg);
}

.Burger.active .burger-bar {
    background-color: #fff;
}

.Burger.active .Burger-Bar--1 {
    transform: rotate(45deg)
}

.Burger.active .Burger-Bar--2 {
    opacity: 0;
}
.Burger.active .Burger-Bar--3 {
    transform: rotate(-45deg)
}
</style>