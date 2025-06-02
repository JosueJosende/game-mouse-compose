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
    class="relative w-full flex items-center justify-center py-2 px-6 text-base font-semibold text-white bg-black/30 border-t-[1px] border-[#caad156e] rounded-b-lg cursor-pointer overflow-hidden transition-all duration-300 ease-in-out scale-x-[106%] hover:text-[#caad15] hover:bg-black/80 hover:border-[#caad15]">
    <div class="z-10 leading-[1]">{{ msgButton }}</div>
  </button>
</template>
