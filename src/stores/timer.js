import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer',  {
  state: () => {
    return {
      time: 240
    }
  },
  actions: {
    countdown() {
      if(this.time > 0) {
        setTimeout(() => {
          this.time -= 1
          this.countdown();
      }, 1000)
      }
    }
  },
  getters: {
    timeLeft() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time - minutes * 60;
      return minutes + ' : ' + seconds;
    }
  }
})