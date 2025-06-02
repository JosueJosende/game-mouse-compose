# 🎮 MouseWord Game

Un juego de agilidad y rapidez donde debes encontrar palabras, seleccionando las letras de un panel con tu cursor del ratón, antes de que se acabe el tiempo, para conseguir la mayor puntuación posible.

![MouseWord](https://github.com/JosueJosende/game-mouse-compose/blob/main/public/screenshot.png)

## 🌟 Características

- 🕹️ **Modo Un Jugador**: Pon a prueba tus habilidades en solitario
- 👥 **Modo Multijugador**: Compite contra otros jugadores en tiempo real
- 🔤 **Tres dimensiones de Panel de Letras**: Selecciona el tamaño del panel
  - Pequeño (6x6)
  - Mediano (7x7)
  - Grande (8x8)
- ⏱️ **Duración de la partida**:
  - 1 minuto (60 segundos)
  - 2 minutos (120 segundos)
  - 3 minutos (180 segundos)
- 🎯 **Niveles progresivos**: Incrementa la dificultad a medida que avanzas
- 🕯️ **Timer visual**: Un contador para ver el tiempo que le queda a la partida

## 🛠️ Tecnologías

- Astro
- Vue 3
- Vite
- TailwindCSS
- SSE para multijugador
- TypeScript

## 🎯 Cómo Jugar

1. **Selecciona tu modo de juego**:
   - Un jugador
   - Multijugador (Crear o unirse a una partida)

2. **Configura tu partida**:
   - Elige la duración de la partida
   - Selecciona el nivel
   - En multijugador, comparte el código con tu oponente

3. **¡A jugar!**
   - Selecciona las letras en el panel para formar palabras
   - Usa el ratón para seleccionar las letras
   - Las palabras deben ser válidas y tener al menos 3 letras
   - Las palabras se validan en tiempo real
   - Las letras seleccionadas se resaltan en el panel
   - Las palabras encontradas y validas sumaran puntos
   - Las palabras repetidas no suman puntos
   - Las palabras no válidas no suman puntos
   - Consigue la mayor puntuación antes de que se acabe el tiempo
   - El contador indica el tiempo restante

## 🚀 Instalación

```bash
# Clona el repositorio
git clone [url-del-repositorio]

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.