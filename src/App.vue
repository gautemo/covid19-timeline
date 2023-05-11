<template>
  <header>
    <h1>COVID-19 Timeline</h1>
    <Who/>
  </header>
  <main v-if="state.nrDays > 0">
    <Control />
    <Map/>
  </main>
  <main v-else class="center-content">
    <p>...loading</p>
  </main>
  <MyFooter/>
</template>

<script setup>
import Who from './components/Who.vue'
import MyFooter from './components/MyFooter.vue'
import Control from './components/Control.vue'
import Map from './components/Map.vue'
import { state } from './state.js';
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

:root{
  --main-color: #35393C;
  --second-color: #397367;
  --third-color: #C0D6DF;
  --fourth-color: #A3C4BC;
  --white: #e9e9e9;
}

body{
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

#app{
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header{
  display: flex;
  flex-wrap: wrap;
  background: var(--main-color);
  align-items: center;
}

header h1{
  flex: 1;
  color: var(--white);
  padding-left: 25px;
  white-space: nowrap;
}

main{
  flex: 1;
  display: flex;
  flex-direction: column;
}

.center-content{
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 800px) {
  header h1{
    font-size: 1.2em;
  }
}
</style>