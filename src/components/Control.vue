<template>
  <div class="control">
    <PlayButton @click="control.playing = !control.playing" :playing="control.playing" />
    <input class="speed" type="range" min="500" max="5000" v-model="control.speed" :style="{ '--percentage': `${(control.speed - 500) / 4500 * 100}%` }" />
    <Speed/>
    <Stats/>
    <div class="progress-bar">
        <Today />
        <h3 class="date">{{day}}</h3>
        <input class="progress" type="range" min="0" :max="nrDays - 1" v-model="progress" :style="{ '--percentage': `${progress / (nrDays-1) * 100}%` }" />
    </div>
  </div>
</template>

<script>
import PlayButton from '@/components/PlayButton'
import Speed from '@/components/icons/Speed'
import Today from '@/components/icons/Today'
import Stats from '@/components/Stats'

import { useState } from '@/state.js';
import { ref, watch, reactive, toRefs, computed } from 'vue';

const startInterval = (state, control) => {
  return setInterval(() => {
    state.progress.value++;
    if(state.progress.value >= state.nrDays.value){
      state.progress.value = state.nrDays.value - 1;
      control.playing = false;
    }
  }, control.speed);
}

export default {
  setup(){
    const state = useState();
    const control = reactive({
      playing: true,
      speed: 1500,
      intervalId: -1,
    })

    control.intervalId = startInterval(state, control)

    watch([toRefs(control).playing, toRefs(control).speed], () => {
      clearInterval(control.intervalId);
      if(control.playing){
        if(state.progress.value == state.nrDays.value - 1){
          state.progress.value = 0;
        }
        control.intervalId = startInterval(state, control)
      }
    })

    const day = computed(() => console.log(state.day.value.date) || new Intl.DateTimeFormat().format(new Date(state.day.value.date)));

    return { day, nrDays: state.nrDays, progress: state.progress, control }
  },
  components: { PlayButton, Speed, Today, Stats }
}
</script>

<style scoped>
.control{
    display: grid;
    grid-template-columns: 30px 200px 30px 1fr;
    padding: 25px;
    align-items: center;
    gap: 20px 5px;
}

.stats{
    justify-self: end;
}

input[type=range]{
    --percentage: 0%;
    cursor: pointer;
    appearance: none;
    border-radius: 10px;
    height: 5px;
    background: linear-gradient(90deg, var(--second-color) var(--percentage), var(--third-color) var(--percentage));
}

input.speed{
    transform: rotate(-180deg);
    background: linear-gradient(90deg, var(--third-color) var(--percentage), var(--second-color) var(--percentage));
}

input.speed:hover + svg >>> .path{
    fill: var(--second-color);
}

.progress-bar:hover >>> .path{
    fill: var(--second-color);
}

.progress-bar{
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 10px;
    align-items: center;
}

[type='range']::-webkit-slider-thumb {
    width: 1.1em;
    height: 1.1em;
    border-radius: 50%;
    background: var(--fourth-color);
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
}
[type='range']:hover::-webkit-slider-thumb {
    opacity: 1;
}

[type='range']::-ms-thumb {
    width: 1.1em;
    height: 1.1em;
    border-radius: 50%;
    background: var(--fourth-color);
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
}
[type='range']:hover::-ms-thumb {
    opacity: 1;
}

[type='range']::-moz-range-thumb {
    width: 1.1em;
    height: 1.1em;
    border-radius: 50%;
    background: var(--fourth-color);
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
}
[type='range']:hover::-moz-range-thumb {
    opacity: 1;
}

</style>