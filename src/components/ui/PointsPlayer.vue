<script setup lang="ts">
import { ref, watch } from 'vue'

const score = ref<number>(0)
const animateScore = ref<boolean>(false)

const props = defineProps({
  points: {
    type: Number,
    required: true,
    default: 60
  }
})

watch(
  () => props.points,
  (newPoints: number) => {
    score.value = !isNaN(newPoints) ? newPoints : ''
    animateScore.value = true
    setTimeout(() => {
      animateScore.value = false
    }, 250)
  }
)
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 text-yellow-400">
    <h3 class="text-lg font-bold [text-shadow:0_0_4px_black]">PUNTOS DEL JUEGO</h3>
    <div
      class="min-h-[52px] mt-2 text-5xl font-bold [text-shadow:0_0_4px_black] transition-all duration-300"
      :class="{ 'scale-125 text-black/50': animateScore }">
      {{ score }}
    </div>
  </div>
</template>
