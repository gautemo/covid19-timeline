<template>
    <div class="stats">
        <span class="stat"><span class="active red">Current Infected: <b>{{format(infectedNow)}}</b></span> <span class="trend" v-html="trendInfectedNow"/></span>
        <span class="stat">Total Cases: <b>{{format(totalcases)}}</b> <span class="trend" v-html="trendTotal"/></span>
        <span class="stat">Recovered Cases: <b>{{format(totalrecovered)}}</b> <span class="trend" v-html="trendRecovered"/></span>
        <span class="stat">Total Deaths: <b>{{format(totaldeaths)}}</b> <span class="trend" v-html="trendDeaths"/></span>
    </div>
</template>

<script>
import { useState } from '@/state.js';
import { computed } from 'vue';
import { getArrowText } from '@/arrows.js';

const sumBy = (arr, prop) => {
    return arr.reduce((acc, current) => {
        const num = parseInt(current[prop]);
        if(isNaN(num)){
            return acc;
        }
        return acc + num;
    }, 0);
}

export default {
    setup(){
        const state = useState();
        const totalcases = computed(() => sumBy(state.day.value.data, 'cases'));
        const totaldeaths = computed(() => sumBy(state.day.value.data, 'deaths'));
        const totalrecovered = computed(() => sumBy(state.day.value.data, 'recovered'));
        const infectedNow = computed(() => totalcases.value - totalrecovered.value - totaldeaths.value);

        const prevtotalcases = computed(() => state.prevDay.value ? sumBy(state.prevDay.value.data, 'cases') : 0);
        const prevtotaldeaths = computed(() => state.prevDay.value ? sumBy(state.prevDay.value.data, 'deaths') : 0);
        const prevtotalrecovered = computed(() => state.prevDay.value ? sumBy(state.prevDay.value.data, 'recovered') : 0);
        const previnfectedNow = computed(() => prevtotalcases.value - prevtotalrecovered.value - prevtotaldeaths.value);

        const trendTotal = computed(() => getArrowText(prevtotalcases.value, totalcases.value));
        const trendDeaths = computed(() => getArrowText(prevtotaldeaths.value, totaldeaths.value));
        const trendRecovered = computed(() => getArrowText(prevtotalrecovered.value, totalrecovered.value, false, true));
        const trendInfectedNow = computed(() => getArrowText(previnfectedNow.value, infectedNow.value));
                
        const format = num => new Intl.NumberFormat().format(num)

        const day = computed(() => new Intl.DateTimeFormat().format(new Date(state.day.value.date)));
        return { totalcases, totaldeaths, totalrecovered, infectedNow, format, day, trendTotal, trendDeaths, trendRecovered, trendInfectedNow }
    }
}
</script>

<style scoped>
.stats{
    display: flex;
    align-items: center;
}

.stat{
    margin: 0 5px;
    font-size: 1.2em;
}

.active{
    border-bottom: 3px solid;
    border-radius: 2px;
}

.red{
    border-color: #d21921;
}

.trend{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    min-height: 0.8em;
}

.trend:empty:before {
  content: "\200b"; /* unicode zero width space character */
}

.trend >>> .color-red{
  color: #d21921;
}

.trend >>> .color-green{
  color: #159c33;
}

@media only screen and (max-width: 1150px) {
    span{
        display: inline-block;
        font-size: 1em;
    }
}
</style>