import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      isBurgerActive: false,
      isPanelOpen: true,
    }
  },
  actions: {
    toggle(){
      this.isBurgerActive = !this.isBurgerActive;
      this.isPanelOpen = !this.isPanelOpen;
    },
    closeSidebarPanel() {
      this.isPanelOpen = false;
    }
  }
})