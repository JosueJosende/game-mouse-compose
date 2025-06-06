import type { APIRoute } from 'astro'
import { getActiveGames, updateGame, removeGame, gameOver } from '@/controllers/game-controller'

// Map de conexiones de jugadores
type PlayerConnection = {
  writer: WritableStreamDefaultWriter<Uint8Array>,
  encoder: TextEncoder,
  playerId: string,
  gameId: string
}

const players = new Map<string, PlayerConnection>()

// Interval to update time
let timerInterval: NodeJS.Timeout | null = null;

function startGameTimer() {

  if (timerInterval === null) {
    timerInterval = setInterval(() => {
      const games = getActiveGames()
      
      // Update timeLeft for all active games
      for (const game of games) {
        if (game.active && !game.isMultiplayer && !game.gameStarted) {
          game.gameStarted = true
          updateGame(game)
        }

        if (game.active && game.isMultiplayer && !game.gameStarted && game.players.length === 2) {
          game.gameStarted = true
          updateGame(game)
        }

        if (game.active && game.timeLeft > 0 && game.gameStarted) {
          game.timeLeft -= 1
          updateGame(game)

          // Send time update to all connected players for this game
          const gamePlayers = Array.from(players.values()).filter((player) => player.gameId === game.gameId)

          gamePlayers.forEach((player, index) => {
            player.writer.write(
              player.encoder.encode(
                `data: ${JSON.stringify({
                  type: 'game-ready',
                  timeLeft: game.timeLeft,
                  players: game.players,
                  points: game.points[index],
                  letters: game.letters
                })}\n\n`
              )
            )
          })

          // If time is up, end the game
          if (game.timeLeft <= 0) {
            gamePlayers.forEach((player) => {
              player.writer.write(
                player.encoder.encode(
                  `data: ${JSON.stringify({
                    type: 'game-over',
                    timeLeft: game.timeLeft,
                    players: game.players,
                    points: game.points
                  })}\n\n`
                )
              )
            })

            // Remove the game from active games
            removeGame(game.gameId)
            gameOver(game.gameId)

            // Remove active Player connections
            /* gamePlayers.forEach((player) => {
              players.delete(player.playerId)
            }) */
          }
        }
      }

      // If all games are inactive, clear the interval
      if (!games.some((g) => g.active)) {
        if (timerInterval) {
          clearInterval(timerInterval)
          timerInterval = null
        }
      }
    }, 1000)
  }
}

// Actualización del tiempo del juego
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const gameId = url.searchParams.get('gameId')
  const playerId = url.searchParams.get('playerId')

  if (!gameId || !playerId) {
    return new Response(JSON.stringify({ error: 'Missing gameId or playerId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (players.has(playerId)) {
    return new Response(JSON.stringify({ error: 'Player already connected' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }  

  // Verifica si el juego existe
  const activeGames = getActiveGames()
  const game = activeGames.find(g => g.gameId === gameId)
  
  if (!game) {
    return new Response(JSON.stringify({ error: 'Game not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const clientId = playerId

  // Función para manejar la desconexión del cliente
  const handleDisconnect = () => {
    // Elimina al jugador del mapa
    players.delete(clientId)
    
    // Busca el juego activo
    const activeGames = getActiveGames()
    const game = activeGames.find(g => g.gameId === gameId)
    
    if (game && game.active) {
      // Marca el juego como terminado
      game.active = false
      // eliminar al jugador de la lista de jugadores
      game.players = game.players.filter(player => player !== playerId)
      game.playerCount = game.players.length
      updateGame(game)
      
      // Notifica a los jugadores conectados
      const gamePlayers = Array.from(players.values()).filter((player) => player.gameId === gameId)
      
      gamePlayers.forEach((player) => {
        try {
          player.writer.write(
            player.encoder.encode(
              `data: ${JSON.stringify({
                type: 'game-over',
                reason: 'player-disconnected',
                timeLeft: game.timeLeft,
                players: game.players,
                points: game.points
              })}\n\n`
            )
          )
        } catch (err) {
          console.error('Error al enviar notificación de game-over:', err)
        }
      })
      
      // Elimina el juego de los activos
      removeGame(gameId)
    }
  }

  // Agrega el jugador al mapa de conexiones
  players.set(clientId, {
    writer,
    encoder,
    playerId,
    gameId
  })
  
  // Monitoreamos writer.closed para detectar cuando el cliente se desconecta
  writer.closed.catch(() => {
    //console.log(`Player ${playerId} disconnected from game ${gameId}`)
    handleDisconnect()
  })

  // Inicia el temporizador del juego si no está activo
  if (!timerInterval) {
    startGameTimer()
  }

  // Return the readable stream as a response
  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}