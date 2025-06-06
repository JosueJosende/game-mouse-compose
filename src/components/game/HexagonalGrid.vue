<script setup lang="ts">
import BtnLetter from '@/components/ui/BtnLetter.vue'

import { computed } from 'vue'
import { useStore } from '@nanostores/vue'
import { gameStore, selectLetter, clearSelection, submitWord } from '@/stores/gameStore'
import type { Letter } from '@/types/type-game'

const game = useStore(gameStore)

const selectedWord = computed(() => game.value.selectedLetters.map((l) => l.letter).join(''))

const handleSubmitWord = () => {
  if (selectedWord.value.length >= 3) {
    submitWord()
  }
}

const handleClearSelection = () => {
  clearSelection()
}
</script>

<template>
  <div
    v-if="!game.gameStarted"
    class="game-card flex flex-col h-full p-4">
    <p class="text-white/60 text-lg w-full mb-8 ml-2">📄 Reglas del juego:</p>
    <ul class="text-white/80 text-sm mt-2 px-8 flex flex-col gap-1 list-disc">
      <li class="text-[0.9rem] leading-5">Haz clic en las letras adyacentes para formar palabras.</li>
      <li class="text-[0.9rem] leading-5">Cada letra seleccionada se añadirá a la palabra en construcción.</li>
      <li class="text-[0.9rem] leading-5">Las palabras deben tener al menos 3 letras para ser válidas.</li>
      <li class="text-[0.9rem] leading-5">Haz clic en el botón "Enviar" para válidar la palabra.</li>
      <li class="text-[0.9rem] leading-5">Cada palabra formada cuenta según la cantidad de letras de la palabra.</li>
      <li class="text-[0.9rem] leading-5">Si la palabra es válida, se añadirá a tu puntuación.</li>
      <li class="text-[0.9rem] leading-5">Si la palabra no es válida, no se añadirá a tu puntuación.</li>
      <li class="text-[0.9rem] leading-5">Las palabras repetidas no contarán puntos.</li>
      <li class="text-[0.9rem] leading-5">El jugador que forme una palabra primero ganará puntos, dicha palabra no será válida para el otro jugador.</li>
      <li class="text-[0.9rem] leading-5">Puedes borrar la palabra en construcción haciendo clic en el botón "Borrar".</li>
      <li class="text-[0.9rem] leading-5">El juego termina cuando se acaba el tiempo.</li>
      <li class="text-[0.9rem] leading-5">El jugador con más puntos al final del tiempo gana.</li>
    </ul>
  </div>
  <div
    v-else
    class="game-card relative h-full">
    <div class="mb-4 flex items-center justify-between w-full">
      <div class="w-[46px]">
        <button
          v-if="selectedWord.length >= 1"
          class="btn-game bg-white/10 hover:bg-white/20 text-white text-sm py-1 px-2 rounded-lg"
          @click="handleClearSelection">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M3.486 5.965c.168 .02 .34 .033 .514 .035c.79 .009 1.539 -.178 2 -.5c.461 -.32 1.21 -.507 2 -.5c.79 -.007 1.539 .18 2 .5c.461 .322 1.21 .509 2 .5c.79 .009 1.539 -.178 2 -.5c.461 -.32 1.21 -.507 2 -.5c.79 -.007 1.539 .18 2 .5c.461 .322 1.21 .509 2 .5c.17 0 .339 -.014 .503 -.034" />
            <path d="M3 3l1.721 10.329a2 2 0 0 0 1.973 1.671h10.612a2 2 0 0 0 1.973 -1.671l1.721 -10.329" />
            <path d="M5 18h14" />
            <path d="M5 21h14" />
          </svg>
        </button>
      </div>

      <div class="selected-word-display px-3 bg-white/5 rounded-lg min-h-[2.2rem] border border-white/10 flex items-center w-[350px] h-[24px]">
        <div
          v-if="selectedWord"
          class="flex-1 font-medium text-xl tracking-wide text-white text-center w-full">
          {{ selectedWord.toUpperCase() }}
        </div>
        <div
          v-else
          class="text-white/50 italic text-center w-full">
          Selecciona letras para formar una palabra
        </div>
      </div>

      <div class="w-[46px]">
        <button
          v-if="selectedWord.length >= 3"
          class="btn btn-game py-1 mr-2 text-sm px-2 rounded-lg bg-[#f59e0b] hover:bg-[#f59e0b9c] text-white flex items-center justify-center focus:outline-none focus:border-none focus:ring-2 focus:ring-[#f59e0b] focus:ring-opacity-0"
          @click="handleSubmitWord">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
          </svg>
        </button>
      </div>
    </div>

    <div class="grid-container mb-2 place-content-center h-[360px]">
      <div class="flex flex-wrap justify-center items-center gap-2 md:gap-3">
        <div
          v-for="(row, rowIndex) in game.letters"
          :key="'row-' + rowIndex"
          class="flex justify-center relative gap-[4px]"
          :style="{ marginBottom: rowIndex % 2 !== 0 ? '-1.5rem' : '-1.5rem' }">
          <BtnLetter
            v-for="(letter, colIndex) in row"
            :key="rowIndex + '-' + colIndex"
            :letter="letter"
            :level="game.level"
            :isSelected="game.selectedLetters.some((l) => l.id === letter.id)"
            :isLast="game.selectedLetters.length > 0 && game.selectedLetters[game.selectedLetters.length - 1].id === letter.id"
            @select="() => selectLetter(letter)" />
        </div>
      </div>
    </div>
  </div>
</template>
