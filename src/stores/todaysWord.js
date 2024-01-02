import { defineStore } from 'pinia'
import json from '../data/1.json'
import { get } from 'jquery'

const STORE_NAME = 'MoCluichí'

const getDefaultSettings = () => ({
  word: "",
  subAnagrams: [],
  firstList: [],
  secondList: [],
  todaysAcceptedWords: [],
  gameStarted: false,
  message: "",
  styleClass: ""
})

const getSettings = () => {
  const settings = localStorage.getItem(STORE_NAME)
  return settings ? JSON.parse(settings) : getDefaultSettings()
}

export const useTodaysWord = defineStore('useTodaysWord', {
  // arrow function recommended for full type inference
  state: () => ({
    settings: getSettings()
  }),
  actions: {
    setTodaysWord(data) {
      this.settings.word = data.word
      this.settings.subAnagrams = data.anagrams
      let wordList = data.word.split("");
      wordList.forEach((l, i) => {
        this.settings.firstList.push({
          id: i,
          title: l
        })
      }) 
    },
    startGame() {
      this.settings.gameStarted = true;
      this.setTodaysWord(json);
    },
    checkGuess() {
      let guess = "";
      this.settings.secondList.forEach((l)=> {
        guess += l.title;
      })
      // check if the guess is in the subAnagrams array
      // and make sure it isn't being added twice
      if(this.settings.subAnagrams.includes(guess) && !this.settings.todaysAcceptedWords.includes(guess)) {
        this.settings.todaysAcceptedWords.push(guess);
        this.settings.message = ('Maith thú, tá ' + guess + ' sa stór focail');
        this.settings.correctAnswer = true;
        this.settings.styleClass = 'rightAnswer';
        localStorage.setItem(STORE_NAME, JSON.stringify(this.settings))
        setTimeout(() => {
          this.settings.message = "";
          this.settings.correctAnswer = false;
          this.settings.styleClass = "";
        }, 2000);
        return;
      }

      // this word has already been accepted as an answer
      if(this.settings.subAnagrams.includes(guess)  && this.settings.todaysAcceptedWords.includes(guess)) {
        this.settings.message = ('Tá an focal ' + guess + ' glactha leis cheanna');
        this.settings.styleClass = 'previousAnswer'
        
        setTimeout(()  => {
          this.settings.message = "";
          this.settings.styleClass = "";
        }, 2000);
        return;
      }

      // if the answer is a wrong answer
      if(!this.settings.subAnagrams.includes(guess)) {
        this.settings.message = ('Níl an focal ' + guess + ' sa stór focal');
        this.settings.styleClass = 'wrongAnswer';
        setTimeout(() => {
          this.settings.message = "";
          this.settings.styleClass = "";
        }, 2000); 
        return;
      }
    },
    handleKeypress(e) {
      let inputKey = e.key;
      let availableLetters = this.settings.firstList;
      const i = availableLetters.findIndex(e => e.title === inputKey);

      if (i > -1) {
        this.settings.secondList.push(...this.settings.firstList.splice(i, 1));
      }
    }
  }
})