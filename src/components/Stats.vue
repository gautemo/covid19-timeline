<template>
    <div class="stats">
        <span class="active red">Current Infected: <b>{{format(infectedNow)}}</b></span>
        <span>Total Cases: <b>{{format(totalcases)}}</b></span>
        <span>Recovered Cases: <b>{{format(totalrecovered)}}</b></span>
        <span>Total Deaths: <b>{{format(totaldeaths)}}</b></span>
    </div>
</template>

<script>
import { useState } from '@/state.js';
import { computed } from 'vue';

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
        const totalcases = computed(() => sumBy(state.day.value.data, 'totalcases'));
        const totaldeaths = computed(() => sumBy(state.day.value.data, 'totaldeaths'));
        const totalrecovered = computed(() => sumBy(state.day.value.data, 'totalrecovered'));
        const infectedNow = computed(() => totalcases.value - totalrecovered.value);
        
        const format = num => new Intl.NumberFormat().format(num)

        return { totalcases, totaldeaths, totalrecovered, infectedNow, format }
    }
}
</script>

<style scoped>
span{
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
</style>