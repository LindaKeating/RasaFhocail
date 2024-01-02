<script setup>
  import { RouterLink } from 'vue-router'
  const { closeSidebarPanel, isPanelOpen } = defineProps({
	  closeSidebarPanel: {
	  	type: Function
	  },
    isPanelOpen: {
      type: Boolean
    }
  })
</script>

<template>
  <div class="Sidebar">
    <div class="Sidebar-Backdrop" 
      @click="closeSidebarPanel" 
      v-if="isPanelOpen">
    </div>
    <transition 
      name="slide">
      <div 
        v-if="isPanelOpen"
        class="Sidebar-Panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>

.slide-enter-active {
  transform: translate(0, 0);
  -webkit-transform: translate(0, 0);
  transform: translate(-300px, 0);
  -webkit-transform: translate(-300px, 0);
}

.slide-leave-active {
  transform: translate(-300px, 0);
  -webkit-transform: translate(-300px, 0);
}

/*
  .slide-enter-active,
  .slide-leave-active
    {
        transition: transform 0.2s ease;
    }
  
  .slide-enter-to {
    transform: translateX(0);
    transition: all 150ms ease-in 0s
  }

  .slide-leave-to {
      transform: translateX(-100%);
      transition: all 150ms ease-in 0s
  }*/

  .Sidebar-Backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  .Sidebar-Panel {
    overflow-y: auto;
    background-color: #130f40;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 300px;
    transition: all 0.2s ease-in-out 0s;
    -webkit-transition: all 0.2s ease-in-out 0s;
  }
</style>