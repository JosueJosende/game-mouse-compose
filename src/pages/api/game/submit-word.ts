import { turso } from '@/services/turso'

import type { APIRoute } from 'astro'
import { getActiveGames, updateGame } from '@/controllers/game-controller'

async function validateWord(word: string, difficulty: string): Promise<boolean> {
  // Convert to lowercase for comparison
  word = word.toLowerCase()

  // Check minimum length
  if (word.length < 3) {
    return false
  }

  const { rows } = await turso.execute(`SELECT word FROM words WHERE word = '${word}'`)

  return rows.length > 0
}

function calculateWordPoints(word: string, difficulty: string): number {
  // Base points by word length
  const lengthPoints = {
    3: 3,
    4: 5,
    5: 8,
    6: 12,
    7: 18,
    8: 30,
    9: 50,
    10: 80
  }

  // Difficulty multipliers
  const multiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2
  }

  // Calculate base points based on word length
  let points = 0
  const length = word.length

  if (length <= 2) {
    points = 0
  } else if (length >= 10) {
    points = 80
  } else {
    points = lengthPoints[length as keyof typeof lengthPoints] || 100
  }

  // Apply difficulty multiplier
  const diffMultiplier = multiplier[difficulty as keyof typeof multiplier] || 1

  return Math.round(points * diffMultiplier)
}

export const POST: APIRoute = async ({ request }) => {
  // console.log('POST /api/game/submit-word');
  
  try {
    const body = await request.json()
    const { gameId, word, playerId } = body

    const games = getActiveGames()
    const game = games.find((g) => g.gameId === gameId && g.players.includes(playerId))

    if (!game) {
      return new Response(JSON.stringify({ error: 'Game not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    }
    if (!game.gameStarted) {
      return new Response(JSON.stringify({ error: 'Game has not started yet' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const isWordValid = await validateWord(word, game.difficulty)

    if (!isWordValid) {
      return new Response(JSON.stringify({ valid: false }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    if (game.foundWords.includes(word)) {
      return new Response(JSON.stringify({ valid: false, message: 'Word already found' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    // Añade la palabra al array de palabras encontradas
    game.foundWords.push(word)

    // Calcula los puntos de la palabra
    const points = calculateWordPoints(word, game.difficulty)
    const playerIndex = game.players.indexOf(playerId)

    const totalPoints = game.points[playerIndex] + points

    if (playerIndex !== -1) {
      game.points[playerIndex] = totalPoints
    }

    updateGame(game)

    // Retornamos la respuesta con la palabra válida
    return new Response(JSON.stringify({ valid: true, points: totalPoints }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch {
    return new Response(JSON.stringify({
      valid: false,
      error: 'Failed to submit word'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}