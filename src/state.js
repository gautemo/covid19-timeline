import { reactive, computed, toRefs } from "vue";
import { getCovid19 } from '@/api';

const state = reactive({
    data: [],
    day: computed(() => state.data[state.progress]),
    nrDays: computed(() => state.data.length ),
    progress: 0,
})

const load = async () => {
    state.data = await getCovid19();
    console.log(state.data);
}

load();

const useState = () => toRefs(state)

export { useState };