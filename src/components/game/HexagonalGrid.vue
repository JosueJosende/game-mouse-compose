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
    class="game-card flex flex-col h-full">
    <p class="text-white/60 text-lg w-full">Instrucciones:</p>
    <ul class="text-white/80 text-sm mt-2 ml-2 flex flex-col gap-2">
      <li class="flex items-center gap-2">
        <div class="flex flex-col gap-1 w-full">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#a3a1a1">
              <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z"></path>
            </svg>
            Selecciona el tiempo de duración de la partida:
          </div>
          <div class="flex gap-2 w-full justify-center">
            <div class="py-1 px-3 bg-black/40 rounded-lg">60" (1 Minuto)</div>
            <div class="py-1 px-3 bg-black/40 rounded-lg">120" (2 Minutos)</div>
            <div class="py-1 px-3 bg-black/40 rounded-lg">180" (3 Minutos)</div>
          </div>
        </div>
      </li>
      <li>
        <div class="flex flex-col gap-1 w-full">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a3a1a1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M7 9.5l-3 1.5l8 4l8 -4l-3 -1.5"></path>
              <path d="M4 15l8 4l8 -4"></path>
              <path d="M12 11v-7"></path>
              <path d="M9 7l3 -3l3 3"></path>
            </svg>
            Selecciona el nivel:
          </div>
          <div class="ml-2 flex gap-2 w-full justify-center">
            <div class="py-1 px-3 bg-black/40 rounded-lg">1 = panel de 6x6</div>
            <div class="py-1 px-3 bg-black/40 rounded-lg">2 = panel de 7x7</div>
            <div class="py-1 px-3 bg-black/40 rounded-lg">3 = panel de 8x8</div>
          </div>
        </div>
      </li>
      <li>&nbsp;</li>
      <li class="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2">
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0 M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        </svg>
        Un jugador:
        <div class="ml-2">
          Botón
          <span class="bg-black/40 py-1 px-3 rounded-lg">Iniciar Juego</span>
          para comenzar la partida.
        </div>
      </li>
      <li>&nbsp;</li>
      <li class="flex items-center gap-2">
        <div class="flex flex-col gap-1 w-full">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85 "></path>
            </svg>
            Multijugador:
          </div>
          <div class="w-full flex mt-2 gap-2 justify-center">
            <div class="w-1/2 ml-4">
              <div class="w-full font-bold">CREAR UNA PARTIDA</div>
              <ul class="flex flex-col text-sm list-disc ml-4">
                <li class="text-[0.8rem] leading-2">Copia el ID del juego</li>
                <li class="text-[0.8rem] leading-2">Comparte el ID del juego con otro jugador</li>
                <li class="text-[0.8rem] leading-2">Presiona el botón <span class="bg-black/40 py-1 px-3 rounded-lg">Iniciar Juego</span></li>
                <li class="text-[0.8rem] leading-2">Espera a que el otro jugador se una</li>
                <li class="text-[0.8rem] leading-2">La partida empezará cuando el otro jugador se una</li>
              </ul>
            </div>
            <div class="w-1/2">
              <div class="w-full font-bold">UNIRSE A UNA PARTIDA</div>
              <ul class="flex flex-col text-sm list-disc ml-4">
                <li class="text-[0.8rem] leading-2">Ingresa un ID de juego</li>
                <li class="text-[0.8rem] leading-2">Presiona el botón <span class="bg-black/40 py-0.5 px-3 rounded-lg">Unirse</span></li>
                <li class="text-[0.8rem] leading-2">La partida empieza para ambos jugadores</li>
              </ul>
            </div>
          </div>
        </div>
      </li>
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
