<script setup>
import { ref } from 'vue'
import { setDifficulty } from '@/stores/gameStore'

const selecttedTime = ref(60)

const emit = defineEmits(['selectTime'])
const props = defineProps({
  time: {
    type: Array,
    default: [60, 120, 180]
  },
  text: {
    type: Array,
    default: ['1 MMIN', '2 MIN', '3 MIN']
  }
})

const time = {
  60: 'easy',
  120: 'medium',
  180: 'hard'
}

const selectTime = (timeSelected) => {
  selecttedTime.value = timeSelected
  setDifficulty(time[timeSelected])
}
</script>

<template>
  <button
    v-for="(time, index) in props.time"
    :key="time"
    :disabled="props.text[index] === '3 MIN' || props.text[index] === '2 MIN'"
    @click="selectTime(time)"
    class="relative w-1/2 h-16 hover:bg-black/40 border border-gray-700 text-gray-300 font-medium rounded-md shadow-md transition-all duration-200 ease-in-out focus:outline-none"
    :class="{
      'bg-black/60': selecttedTime === time,
      'bg-black/20': selecttedTime !== time, // Asegura que solo uno de los fondos se aplique
      'opacity-50 cursor-not-allowed': ['3 MIN', '2 MIN'].includes(props.text[index])
    }">
    <!-- LED Indicador -->
    <div
      class="absolute top-2 left-2 w-2 h-2 rounded-full transition-all duration-300"
      :class="selecttedTime === time ? 'bg-green-500 border-none' : 'bg-transparent border border-gray-700'"></div>
    <div class="flex items-center justify-center">
      <span class="text-[1.4rem] tracking-wide [text-shadow:0_0_4px_black]">{{ props.text[index] }}</span>
    </div>
  </button>
</template>
