<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from '@nanostores/vue'
import { gameStore } from '@/stores/gameStore'

import CandleTimer from '@/components/ui/CandleTimer.vue'
import PointsPlayer from '@/components/ui/PointsPlayer.vue'

const game = useStore(gameStore)
const timeLeft = ref(game.value.timeLeft)
const score = ref(game.value.score)

watch(game, (newGame: typeof game.value) => {
  score.value = newGame.score
  timeLeft.value = newGame.timeLeft
})
</script>

<template>
  <div
    v-if="!game.gameStarted"
    class="game-card h-full flex flex-col gap-2">
    <p class="text-white/60 text-lg text-center">Reglas:</p>
    <ul class="text-white/80 text-sm mt-2 ml-2 flex flex-col gap-2">
      <li class="text-[0.9rem] leading-none">Haz clic en las letras adyacentes para formar palabras.</li>
      <li class="text-[0.9rem] leading-none">Cada letra seleccionada se añadirá a la palabra en construcción.</li>
      <li class="text-[0.9rem] leading-none">Las palabras deben tener al menos 3 letras para ser válidas.</li>
      <li class="text-[0.9rem] leading-none">Haz clic en el botón "Enviar" para válidar la palabra.</li>
      <li class="text-[0.9rem] leading-none">Cada palabra formada cuenta según la cantidad de letras de la palabra.</li>
      <li class="text-[0.9rem] leading-none">Si la palabra es válida, se añadirá a tu puntuación.</li>
      <li class="text-[0.9rem] leading-none">Si la palabra no es válida, no se añadirá a tu puntuación.</li>
      <li class="text-[0.9rem] leading-none">Las palabras repetidas no contarán puntos.</li>
      <li class="text-[0.9rem] leading-none">El jugador que forme una palabra primero ganará puntos, dicha palabra no será válida para el otro jugador.</li>
      <li class="text-[0.9rem] leading-none">Puedes borrar la palabra en construcción haciendo clic en el botón "Borrar".</li>
      <li class="text-[0.9rem] leading-none">El juego termina cuando se acaba el tiempo.</li>
      <li class="text-[0.9rem] leading-none">El jugador con más puntos al final del tiempo gana.</li>
    </ul>
  </div>
  <div
    v-else
    class="game-card h-full flex flex-col items-center justify-between max-h-[480px]">
    <PointsPlayer :points="score" />
    <img
      class="w-[80%]"
      src="../../../public/compose-mouse.png"
      alt="mascota" />
    <CandleTimer :duration="timeLeft" />
  </div>
</template>
