<template>
  <div class="control">
    <PlayButton @click="control.playing = !control.playing" :playing="control.playing"/>
    <input class="speed" type="range" min="500" max="5000" v-model.number="control.speed" :style="{ '--percentage': `${(control.speed - 500) / 4500 * 100}%` }" />
    <span class="speed-display">
        <span>{{speedDisplay}}</span>
        <Speed/>
    </span>
    <label class="simulate">
        <span @click="simulate = false" class="label">Tracked<br/> recovered</span>
        <div class="switch" :class="{checked: simulate}" @click="simulate = !simulate">
            <div class="slider"></div>
        </div>
        <span @click="simulate = true" class="label">Estimated<br/> recovered</span>
        <div class="info">
            <Info class="simulate-info-icon"/>
            <span class="simulate-info">
                <span class="label">Tracked recovered cases:</span>
                <p>
                    Current infected and recovered cases from the numbers that the countries have recorded being recovered. 
                    Note that this numbers can be incorrect, since not all is tracking theese numbers.
                </p>                
                <span class="label">Estimated recovered cases:</span>
                <p>
                    Current infected and recovered cases from a three-week rolling total of new cases. 
                    Which is reasonable according to average healing time and most tests are taken some time after the person was exposed.
                </p>
            </span>
        </div>
    </label>
    <Stats/>
    <div class="progress-bar">
        <Today />
        <h3 class="date">{{day}}</h3>
        <input class="progress" type="range" min="0" :max="nrDays - 1" v-model.number="progress" :style="{ '--percentage': `${progress / (nrDays-1) * 100}%` }" />
    </div>
  </div>
</template>

<script>
import PlayButton from '@/components/PlayButton'
import Speed from '@/components/icons/Speed'
import Today from '@/components/icons/Today'
import Info from '@/components/icons/Info'
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

    const day = computed(() => new Intl.DateTimeFormat().format(new Date(state.day.value.date)));

    const speedDisplay = computed(() => `${parseFloat((control.speed/1000).toFixed(1))}s`)
    
    return { day, nrDays: state.nrDays, progress: state.progress, control, speedDisplay, simulate: state.simulateRecovered }
  },
  components: { PlayButton, Speed, Today, Stats, Info }
}
</script>

<style scoped>
.control{
    display: grid;
    grid-template-columns: 30px 200px 70px 1fr auto;
    padding: 25px;
    align-items: center;
    gap: 20px 5px;
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

input.speed:hover + svg ::v-deep(.path){
    fill: var(--second-color);
}

.progress-bar:hover ::v-deep(.path){
    fill: var(--second-color);
}

.progress-bar{
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 10px;
    align-items: center;
}

.speed-display{
    display: flex;
    align-items: center;
}

.speed-display span{
    min-width: 32px;
}

[type='range'], [type='range']::-webkit-slider-thumb{
    appearance: none;
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

.simulate{
    margin-right: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
}

.simulate .label{
    font-weight: bold;
}

.switch{
    position: relative;
    width: 60px;
    height: 30px;
}

.slider{
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: .4s;
    background: var(--second-color);
    border-radius: calc(25px * 0.1);
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--third-color);
  transition: .4s;
  border-radius: calc(25px * 0.1);
}

.checked .slider{
    background: var(--main-color);
}

.checked .slider:before{
    transform: translateX(26px);
}

.info{
    position: relative;
}

.info p{
    margin: 3px 0;
}

.simulate-info{
    position: absolute;
    width: 375px;
    padding: 10px 20px;
    border-radius: calc(25px * 0.1);
    top: 40px;
    left: 0;
    background: var(--third-color);
    display: none;
    z-index: 5;
}

.info:hover .simulate-info,
.info:focus .simulate-info{
    display: block;
}

@media only screen and (max-width: 1150px) {
    .control{
        padding: 15px;
    }

    .stats{
        grid-column: 1 / -1;
        justify-self: start;
    }

    [type='range']::-webkit-slider-thumb {
        opacity: 1;
    }

    [type='range']::-ms-thumb {
        opacity: 1;
    }

    [type='range']::-moz-range-thumb {
        opacity: 1;
    }
}

@media only screen and (max-width: 600px) {
    .control{
        padding: 5px;
        grid-template-columns: 30px 1fr 70px 1fr;
    }
}
</style>