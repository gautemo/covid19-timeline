import { reactive, computed, toRefs } from "vue";
import { getCovid19 } from './api/api';

const state = reactive({
    data: [],
    day: computed(() => state.data[state.progress]),
    prevDay: computed(() => state.progress === 0 ? [] : state.data[state.progress - 1].data),
    nrDays: computed(() => state.data.length ),
    progress: 0,
    simulateRecovered: true,
})

const load = async () => state.data = await getCovid19();

load();

export { state };