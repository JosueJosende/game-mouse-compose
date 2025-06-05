<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { gameStore, resetGame } from '@/stores/gameStore'

const game = useStore(gameStore)
</script>

<template>
  <div
    v-if="game.gameOver"
    class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
    <div class="bg-gradient-to-b from-[#3e364b8c] to-transparent p-8 rounded-xl max-w-md w-full text-center shadow-2xl border border-[#27232d]">
      <h2 class="text-3xl font-semibold text-white mb-4">Finalizó el Juego!</h2>

      <div
        v-if="game.isMultiplayer"
        class="mb-6">
        <div class="text-2xl mb-4">
          <div
            v-if="game.score > game.opponentScore"
            class="text-success-500">
            ¡Ganaste! 🎉
          </div>
          <div
            v-else-if="game.score < game.opponentScore"
            class="text-error-500">
            ¡Perdiste!
          </div>
          <div
            v-else
            class="text-accent-500">
            ¡Es un empate!
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-white/10 p-4 rounded">
            <div class="text-lg min-h-[56px] mb-1 text-[#b8860b]">Tus Puntos</div>
            <div class="text-4xl font-bold text-accent-400">{{ game.score }}</div>
            <div class="text-sm text-white/60">{{ game.foundWords.length }} palabras</div>
          </div>

          <div class="bg-white/10 p-4 rounded">
            <div class="text-lg mb-1 min-h-[56px] text-[#439db9]">Puntos del Oponente</div>
            <div class="text-4xl font-bold text-secondary-400">{{ game.opponentScore }}</div>
            <!-- <div class="text-lg text-white/60">{{ game.opponentWords.length }} words</div> -->
          </div>
        </div>
      </div>
      <div
        v-else
        class="mb-6">
        <p class="text-xl text-sky-200 mb-2">Puntuación Final</p>
        <span class="font-bold text-3xl text-accent-400">{{ game.score }}</span>
      </div>

      <div class="mb-6">
        <h3 class="text-xl text-white/90 mb-2">{{ game.foundWords.length }} Palabras Encontradas:</h3>
        <div class="max-h-48 overflow-y-auto bg-white/5 rounded p-2">
          <div
            v-if="game.foundWords.length > 0"
            class="flex flex-wrap gap-2 justify-center">
            <span
              v-for="(word, i) in game.foundWords"
              :key="i"
              class="bg-white/10 rounded-2xl text-[.85rem] px-3 text-white/80">
              {{ word.word
              }}<!--  (+{{ word.points }}) -->
            </span>
          </div>
          <p
            v-else
            class="text-white/50 italic">
            No se encontraron palabras
          </p>
        </div>
      </div>

      <button
        class="w-full border-[#272332d] bg-black/30 rounded-lg p-2 text-white/50 hover:bg-black/60 transition-colors duration-200 focus:outline-none hover:text-white/90"
        @click="() => resetGame()">
        Juega de Nuevo
      </button>
    </div>
  </div>
</template>
