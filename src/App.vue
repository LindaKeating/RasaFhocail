<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import Burger from './components/menu/Burger.vue';
  import Sidebar from './components/menu/Sidebar.vue';
  import { useMenuStore } from '@/stores/menu';
  const menuStore = useMenuStore()
</script>

<template>
  <header>
    <Burger 
      :is-burger-active="menuStore.isBurgerActive"
      :toggle="menuStore.toggle" />
      <Sidebar
        :closeSidebarPanel="menuStore.closeSidebarPanel"
        :isPanelOpen="menuStore.isPanelOpen"
      >
        <ul class="Sidebar-Panel-Nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </ul>
      </Sidebar>
    <div class="wrapper">
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
