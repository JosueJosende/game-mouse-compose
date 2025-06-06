import type { APIRoute } from 'astro'
import { getActiveGames, updateGame, removeGame } from '@/controllers/game-controller'



export const POST: APIRoute = async ({ request }) => {

  const { gameId, playerId } = await request.json();

  // Aquí iría la lógica para unir al jugador a la partida
  const activeGames = getActiveGames();
  const game = activeGames.find(g => g.gameId === gameId);
  if (!game) {
    return new Response(JSON.stringify({ error: 'Game not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (game.players.includes(playerId)) {
    return new Response(JSON.stringify({ error: 'Player already joined' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Añadir el jugador a la partida
  game.players.push(playerId);
  game.playerCount = game.players.length;
  updateGame(game);
  //console.log(`Player ${playerId} joined game ${gameId}`);
  

  return new Response(JSON.stringify({ success: true, data: game }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}