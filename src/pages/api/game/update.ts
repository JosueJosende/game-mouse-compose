import type { APIRoute } from 'astro'
import { getActiveGames, updateGame } from '@/controllers/game-controller'
import { letterFrequencies, timeMap } from '@/constants/constants'
import { generateLetterGrid } from '@/services/generate-pannel'

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  
  const { propertiesGame } = body

  // Check if the game exists
  const existingGame = getActiveGames().find((game) => game.gameId === propertiesGame.gameId)

  if (!existingGame) {
    return new Response(JSON.stringify({ success: false, message: 'Game not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const timeGame = timeMap[propertiesGame.difficulty as keyof typeof timeMap] || 120
  const letters = generateLetterGrid(propertiesGame.difficulty, propertiesGame.level)

  const updatePropertiesGame = { ...propertiesGame, letters, timeLeft: timeGame }

  // Update the game properties
  updateGame({ ...existingGame, ...updatePropertiesGame })

  return new Response(JSON.stringify({ success: true, message: 'Game updated successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}