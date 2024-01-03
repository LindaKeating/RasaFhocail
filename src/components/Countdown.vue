<template>
  <div> {{ timerStore.timeLeft }}</div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useTimerStore } from '@/stores/timer';
  import { useTodaysWord } from '@/stores/todaysWord';

  const timerStore = useTimerStore()
  const gameStore = useTodaysWord()

  onMounted(() => {
     //timerStore.countdown();
     window.addEventListener('keypress', gameStore.handleKeypress)
  })

</script>

<style lang="scss" scoped>
</style>