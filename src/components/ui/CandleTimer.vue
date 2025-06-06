<template>
  <div class="h-full flex flex-col justify-end text-center text-yellow-400 mb-1">
    <span class="text-[2.5rem] font-bold block [text-shadow:0_0_4px_black]">{{ formatTime(timeLeft) }}</span>
    <span class="text-base opacity-80 uppercase text-yellow-300 [text-shadow:0_0_4px_black]">tiempo restante</span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
// Props
const props = defineProps({
  duration: {
    type: Number,
    required: true,
    default: 59
  }
})

const initialTime = ref(props.duration)
const timeLeft = ref(props.duration)

watch(
  () => props.duration,
  (newDuration) => {
    timeLeft.value = newDuration
    initialTime.value = newDuration
  }
)

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>
