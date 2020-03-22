<template>
    <div class="btn" :class="state">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    setup(props){
        const state = computed(() => props.playing ? 'pause' : 'play')
        return { state }
    }
}
</script>

<style scoped>
.btn {
    --size: 25px;
    position: relative;
    width: var(--size);
    height: var(--size);
    border: var(--main-color) calc(var(--size) * 0.1) solid;
    border-radius: calc(var(--size) * 0.1);
    cursor: pointer;
    transition: border 0.2s ease-in-out;
}

.btn.pause{
    border-color: var(--second-color);
}

.btn.pause .bar{
    background-color: var(--second-color);
}

.btn .bar {
    display: inline-block;
    position: absolute;
    top: calc(var(--size) / 4);
    left: 0;
    width: calc(var(--size) * 0.1);
    height: calc(var(--size) / 2);
    border-radius: calc(var(--size) * 0.1);
    background-color: var(--main-color);
    transform-origin: center;
    transition: transform 0.4s ease-in-out, background-color 0.2s ease-in-out;
}

.btn:hover{
    border-color: var(--second-color);
}

.btn:hover .bar{
    background-color: var(--second-color);
}

.btn.play .bar-1 {
    transform: translateX(calc(var(--size) / 2)) translateY(calc(var(--size) / -8)) rotate(-55deg);
}

.btn.play .bar-2 {
    transform: translateX(calc(var(--size) / 2)) translateY(calc(var(--size) / 8)) rotate(-125deg);
}

.btn.pause .bar-2 {
    transform: translateX(calc(var(--size) * 0.6)) translateY(0px) rotate(0deg);
}

.btn.pause .bar-1 {
    transform: translateX(calc(var(--size) * 0.3375)) translateY(0px) rotate(0deg);
}
</style>