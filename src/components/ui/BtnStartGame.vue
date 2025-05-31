<script setup lang="ts">
import { ref } from 'vue'
import { startGame } from '@/stores/gameStore'

const msgButton = ref<string>('Iniciar Juego')

const handleStartGame = () => {
  startGame()
  msgButton.value = 'Espere...'
}
</script>

<template>
  <button
    @click="handleStartGame"
    class="relative flex items-center justify-center gap-2 py-2 px-6 text-base font-semibold text-white bg-black/50 rounded-lg cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_#caad15] hover:scale-105 hover:text-[#caad15]">
    <div class="z-10 leading-[1]">{{ msgButton }}</div>
  </button>
</template>
