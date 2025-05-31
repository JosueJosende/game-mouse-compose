import { APIRoute } from 'astro'
import { getActiveGames, createGame } from '@/controllers/game-controller'
import { letterFrequencies, timeMap } from '@/constants/constants'
import { generateLetterGrid } from '@/services/generate-pannel'

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { gameId, playerId, timeLeft, difficulty, level, playerCount, isMultiplayer } = body

  // Checkea si el juego ya existe
  const existingGame = getActiveGames().find((game) => game.gameId === gameId)
  
  if (existingGame) {
    return new Response(JSON.stringify({ success: false, message: 'Game already exists' }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const timeGame = timeMap[difficulty as keyof typeof timeMap] || 120

  const letters = generateLetterGrid(difficulty, level)

  const properties = {
    gameId,
    players: [playerId],
    letters,
    timeLeft: timeGame,
    difficulty,
    playerCount,
    isMultiplayer,
    level,
    foundWords: [],
    startTime: Date.now(),
    active: true,
    points: [0, 0] // Assuming two players, initialize points to 0
  }

  // Crea el nuevo juego
  const newGame = await createGame(properties)

  if (!newGame) {
    return new Response(JSON.stringify({ success: false, message: 'Failed to create game' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify(properties), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  })
}
