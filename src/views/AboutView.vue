<script setup>
  import { useTodaysWord } from '@/stores/todaysWord';
  import { useTimerStore } from '@/stores/timer';


  import DragDrop from '../components/DragDrop.vue'
  import TimerA from '../components/TimerA.vue'
  import Countdown from '../components/Countdown.vue'
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  

  const store = useTodaysWord();
  const timerStore = useTimerStore();
  const { settings, firstList, secondList, styleClass } = storeToRefs(store);

  onMounted(() => {
    // check if todays game already exists
  })

</script>
<template>
  <div class="about container">
    <!-- Countdown Interface -->
    <TimerA >
      <Countdown />
    </TimerA>
  </div>
  <DragDrop
      :styleClass="settings.styleClass"
      :first-list="settings.firstList" 
      :second-list="settings.secondList"
      />
      <!-- Bootstrap -->
  <div class="Message-Container">
    {{ settings.message }}
  </div>
  <div class="Accepted-Words">
    <!-- Focal Glactha -->
    <span class="Accepted-Word" 
			 v-for="word in settings.todaysAcceptedWords" :key="word.id">
       {{ word }} ({{ word.length }})
    </span>  
  </div>
  <button 
    v-if="!settings.gameStarted"
    @click="store.startGame(); timerStore.countdown();"
    class="btn btn-primary btn-lg Tomhas">Start Game</button>
  <button 
    v-if="settings.gameStarted"
    @click="store.checkGuess()"
    class="btn btn-primary btn-lg Tomhas">Tomhas</button>
</template>

<style>
.Tomhas {
  width: 100%;
}

.Accepted-Words {
  background: white;
  opacity: 5%;
  border-radius: .5em;
  min-height: 3rem;
}

.Message-Container {
  min-height: 2rem;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
