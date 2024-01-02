<script >
</script>

<template>
  <div class="Timer">
    <svg 
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      height='60vmin'
      width='60vmin'
      >
      <circle class="Timer-Dots" cx="50%" cy="50%" r="46%"   fill="transparent" />
      <circle class="Timer-Pie playing" cx="50%" cy="50%" r="46%" /> 
    </svg>
    <div class="Timer-MinutesLeft">
      <slot>
      </slot>
      <div class="Timer-Labels">bomaite : soicind</div>
    </div>
  </div>
   
</template>


<style lang="scss" scoped>
  .Timer {
    position: relative; 
    stroke-width: 6;
    stroke-dasharray: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vmin;

    &-MinutesLeft {
      font-size: 3.2rem;
      color: white;
      line-height: 3.2rem;
    }

    &-Labels {
      font-size: medium;
      text-align: center;
      line-height: 1rem;
      opacity: 60%;
    }
  }

  .Timer-Dots {
    stroke: rgb(47, 43, 50);
  }

  svg {
    position: absolute;
  }

  .Timer-Pie {
    fill: transparent;
    stroke: rgb(163, 129, 66);
    stroke-width: 7px;
    stroke-dasharray: 471;
    stroke-dashoffset: 471;
    animation-name: clock-animation, dot-animation;
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-play-state: paused ;
    transform: rotate(-90deg);
    transform-origin: center;
  }

  .playing {
    animation-play-state: running !important;
  }

  @keyframes clock-animation {
    0% {
      stroke-dashoffset: 471;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes dot-animation {
    25% {
      stroke: rgb(82, 163, 66);
    }
    50% {
      stroke: rgb(153, 163, 66);
    }
    75% {
      stroke: rgb(163, 126, 66);
    }
    99% {
      stroke: rgb(163, 66, 66);
    }
  }
</style>