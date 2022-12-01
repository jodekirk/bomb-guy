const TILE_SIZE = 30
const FPS = 30
const SLEEP = 1000 / FPS
const TPS = 2
const DELAY = FPS / TPS

enum Tile {
  AIR,
  UNBREAKABLE,
  STONE,
  BOMB,
  BOMB_CLOSE,
  BOMB_REALLY_CLOSE,
  TMP_FIRE,
  FIRE,
  EXTRA_BOMB,
  MONSTER_UP,
  MONSTER_RIGHT,
  TMP_MONSTER_RIGHT,
  MONSTER_DOWN,
  TMP_MONSTER_DOWN,
  MONSTER_LEFT,
}

interface Input {
  handle (): void
}

class Up implements Input {
  handle (): void {
    move(0, -1)
  }
}

class Down implements Input {
  handle (): void {
    move(0, 1)
  }
}

class Left implements Input {
  handle (): void {
    move(-1, 0)
  }
}

class Right implements Input {
  handle (): void {
    move(1, 0)
  }
}

class Place implements Input {
  handle (): void {
    placeBomb()
  }
}

let playerx = 1
let playery = 1
const map: Tile[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 2, 2, 2, 2, 2, 1],
  [1, 0, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 0, 0, 0, 1],
  [1, 2, 1, 2, 1, 0, 1, 0, 1],
  [1, 2, 2, 2, 2, 0, 0, 10, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
]
/* [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 10, 0, 1],
  [1, 2, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 10, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 2, 0, 0, 0, 1],
  [1, 0, 0, 2, 0, 2, 0, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
] */

const inputs: Input[] = []

let delay = 0
let bombs = 1
let gameOver = false

function explode (x: number, y: number, type: Tile) {
  if (map[y][x] === Tile.STONE) {
    if (Math.random() < 0.1) map[y][x] = Tile.EXTRA_BOMB
    else map[y][x] = type
  } else if (map[y][x] !== Tile.UNBREAKABLE) {
    if (isBombLike(map[y][x])) bombs++
    map[y][x] = type
  }
}

function move (x: number, y: number) {
  if (
    map[playery + y][playerx + x] == Tile.AIR ||
    map[playery + y][playerx + x] === Tile.FIRE
  ) {
    playery += y
    playerx += x
  } else if (map[playery + y][playerx + x] === Tile.EXTRA_BOMB) {
    playery += y
    playerx += x
    bombs++
    map[playery][playerx] = Tile.AIR
  }
}

function placeBomb () {
  if (bombs > 0) {
    map[playery][playerx] = Tile.BOMB
    bombs--
  }
}

function updateTile (y: number, x: number) {
  if (map[y][x] === Tile.BOMB) {
    map[y][x] = Tile.BOMB_CLOSE
  } else if (map[y][x] === Tile.BOMB_CLOSE) {
    map[y][x] = Tile.BOMB_REALLY_CLOSE
  } else if (map[y][x] === Tile.BOMB_REALLY_CLOSE) {
    explode(x, y - 1, Tile.FIRE)
    explode(x, y + 1, Tile.TMP_FIRE)
    explode(x - 1, y, Tile.FIRE)
    explode(x + 1, y, Tile.TMP_FIRE)
    map[y][x] = Tile.FIRE
    bombs++
  } else if (map[y][x] === Tile.TMP_FIRE) {
    map[y][x] = Tile.FIRE
  } else if (map[y][x] === Tile.FIRE) {
    map[y][x] = Tile.AIR
  } else if (map[y][x] === Tile.TMP_MONSTER_DOWN) {
    map[y][x] = Tile.MONSTER_DOWN
  } else if (map[y][x] === Tile.TMP_MONSTER_RIGHT) {
    map[y][x] = Tile.MONSTER_RIGHT
  } else if (map[y][x] === Tile.MONSTER_RIGHT) {
    if (map[y][x + 1] === Tile.AIR) {
      map[y][x] = Tile.AIR
      map[y][x + 1] = Tile.TMP_MONSTER_RIGHT
    } else {
      map[y][x] = Tile.MONSTER_DOWN
    }
  } else if (map[y][x] === Tile.MONSTER_DOWN) {
    if (map[y + 1][x] === Tile.AIR) {
      map[y][x] = Tile.AIR
      map[y + 1][x] = Tile.TMP_MONSTER_DOWN
    } else {
      map[y][x] = Tile.MONSTER_LEFT
    }
  } else if (map[y][x] === Tile.MONSTER_LEFT) {
    if (map[y][x - 1] === Tile.AIR) {
      map[y][x] = Tile.AIR
      map[y][x - 1] = Tile.MONSTER_LEFT
    } else {
      map[y][x] = Tile.MONSTER_UP
    }
  } else if (map[y][x] === Tile.MONSTER_UP) {
    if (map[y - 1][x] === Tile.AIR) {
      map[y][x] = Tile.AIR
      map[y - 1][x] = Tile.MONSTER_UP
    } else {
      map[y][x] = Tile.MONSTER_RIGHT
    }
  }
}

function updateMap () {
  for (let y = 1; y < map.length; y++) {
    for (let x = 1; x < map[y].length; x++) {
      updateTile(y, x)
    }
  }
}

function isGameOver () {
  if (map[playery][playerx] === Tile.FIRE || isMonster(map[playery][playerx]))
    gameOver = true
}

function handleInputs () {
  while (!gameOver && inputs.length > 0) {
    const input = inputs.pop()
    input?.handle()
  }
}

function update () {
  handleInputs()
  isGameOver()
  if (--delay > 0) return
  delay = DELAY
  updateMap()
}

function draw () {
  const g = drawGraphics()
  if (!g) return
  drawMap(g)
  drawPlayer(g)
}

function drawGraphics () {
  const canvas = <HTMLCanvasElement>document.getElementById('GameCanvas')
  const g = canvas.getContext('2d')
  g?.clearRect(0, 0, canvas.width, canvas.height)
  return g
}

function drawPlayer (g: CanvasRenderingContext2D) {
  if (gameOver) return

  function head (fillColor: string | CanvasGradient | CanvasPattern = '#ffad40') {
    g.beginPath()
    g.fillStyle = fillColor
    g.arc(
      playerx * TILE_SIZE + TILE_SIZE / 2,
      playery * TILE_SIZE + TILE_SIZE / 6,
      TILE_SIZE / 6,
      0,
      2 * Math.PI
    )
    g.fill()
  }

  head('#ffad40')

  function body (fillColor: string | CanvasGradient | CanvasPattern = '#ffad40') {
    g.beginPath()
    g.fillStyle = fillColor
    g.arc(
      playerx * TILE_SIZE + TILE_SIZE / 2,
      playery * TILE_SIZE + TILE_SIZE / 1.8,
      TILE_SIZE / 3,
      0,
      2 * Math.PI
    )
    g.fill()
  }

  body('#ffad40')

  function ears () {
    //right ear
    g.arc(
      playerx * TILE_SIZE + TILE_SIZE / 1.5,
      playery * TILE_SIZE + TILE_SIZE / 11,
      TILE_SIZE / 14,
      2.2,
      1
    )
    //left ear
    g.arc(
      playerx * TILE_SIZE + TILE_SIZE / 3.2,
      playery * TILE_SIZE + TILE_SIZE / 11,
      TILE_SIZE / 14,
      2.2,
      1
    )
    g.fill()
  }

  ears()

  function eyes () {
    g.beginPath()
    g.fillStyle = '#000'
    g.strokeStyle = '#FFF'
    //left eye
    g.arc(
      playerx * TILE_SIZE + TILE_SIZE / 2.3,
      playery * TILE_SIZE + TILE_SIZE / 8,
      TILE_SIZE / 24,
      0,
      2 * Math.PI
    )
    g.stroke()
    g.fill()
    //right eye
    g.beginPath()
    g.arc(
      playerx * TILE_SIZE + TILE_SIZE / 1.8,
      playery * TILE_SIZE + TILE_SIZE / 8,
      TILE_SIZE / 24,
      0,
      2 * Math.PI
    )
    g.stroke()
    g.fill()
  }

  eyes()

  function mouth () {
    g.beginPath()
    g.fillStyle = '#F00'
    g.arc(
      playerx * TILE_SIZE + TILE_SIZE / 2,
      playery * TILE_SIZE + TILE_SIZE / 4,
      TILE_SIZE / 20,
      2.2,
      1
    )
    g.fill()
  }

  mouth()
}

function drawMap (g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      fillTile(g, y, x)
    }
  }
}

function fillTile (g: CanvasRenderingContext2D, y: number, x: number) {
  const position = map[y][x]
  if (position === Tile.UNBREAKABLE) g.fillStyle = '#999999'
  else if (position === Tile.STONE) g.fillStyle = '#0000cc'
  else if (position === Tile.EXTRA_BOMB) g.fillStyle = '#0f0'
  else if (position === Tile.FIRE) g.fillStyle = '#ffcc00'
  else if (isMonster(position)) drawMonster(g, map, x, y)
  else if (position === Tile.BOMB) g.fillStyle = '#770000'
  else if (position === Tile.BOMB_CLOSE) g.fillStyle = '#ab0000'
  else if (position === Tile.BOMB_REALLY_CLOSE) g.fillStyle = '#ff0000'

  if (isBombLike(position)) {
    drawBomb(g, x, y)
  } else if (position !== Tile.AIR && !isMonster(position))
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
}

function drawMonster (
  g: CanvasRenderingContext2D,
  map: Tile[][],
  x: number,
  y: number
): void {
  g.beginPath()
  g.fillStyle = '#640064'
  g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  g.fill()
  g.beginPath()
  g.fillStyle = '#005400'
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 2,
    y * TILE_SIZE + TILE_SIZE / 1.8,
    TILE_SIZE / 2.5,
    0,
    2 * Math.PI
  )
  g.fill()
  g.beginPath()
  g.fillStyle = '#0F0'
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 2,
    y * TILE_SIZE + TILE_SIZE / 6,
    TILE_SIZE / 6,
    0,
    2 * Math.PI
  )
  g.fill()
  g.beginPath()
  g.fillStyle = '#FFF'
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 2,
    y * TILE_SIZE + TILE_SIZE / 6,
    TILE_SIZE / 11,
    0,
    2 * Math.PI
  )
  g.fill()
  g.beginPath()
  g.fillStyle = '#000'
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 2,
    y * TILE_SIZE + TILE_SIZE / 4.5,
    TILE_SIZE / 19,
    0,
    2 * Math.PI
  )
  g.fill()
  g.beginPath()
  g.fillStyle = '#FFF'
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 1.8,
    y * TILE_SIZE + TILE_SIZE / 1.8,
    TILE_SIZE / 6,
    0,
    2
  )
  g.fill()
  g.beginPath()
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 1.8,
    y * TILE_SIZE + TILE_SIZE / 1.3,
    TILE_SIZE / 4,
    -1,
    0.6
  )
  g.fill()
  // middle fang
  g.beginPath()
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 3.4,
    y * TILE_SIZE + TILE_SIZE / 1.2,
    TILE_SIZE / 4,
    -1,
    0.8
  )
  g.fill()
  // left fang
  g.beginPath()
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 2,
    y * TILE_SIZE + TILE_SIZE / 1.4,
    TILE_SIZE / 4,
    -4,
    -2
  )
  g.fill()
}

function isMonster (position: Tile) {
  return (
    position === Tile.MONSTER_UP || position === Tile.MONSTER_LEFT || position === Tile.MONSTER_RIGHT || position === Tile.MONSTER_DOWN
  )
}

function isBombLike (position: Tile) {
  return (
    position === Tile.BOMB ||
    position === Tile.BOMB_CLOSE ||
    position === Tile.BOMB_REALLY_CLOSE
  )
}

function drawBomb (g: CanvasRenderingContext2D, x: number, y: number) {
  g.beginPath()
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 2,
    y * TILE_SIZE + TILE_SIZE / 2,
    TILE_SIZE / 3.9,
    0,
    2 * Math.PI
  )
  g.fill()
  g.arc(
    x * TILE_SIZE + TILE_SIZE / 4,
    y * TILE_SIZE - TILE_SIZE / 4,
    TILE_SIZE / 8,
    0.5,
    Math.PI * 0.5
  )
  g.closePath()
  g.fill()
}

function gameLoop () {
  const before = Date.now()
  update()
  draw()
  const after = Date.now()
  setTimeout(() => gameLoop(), sleep(before, after))
}

function sleep (before: number, after: number) {
  const frameTime = after - before
  return SLEEP - frameTime
}

window.onload = () => {
  gameLoop()
}

const LEFT_KEY = 'ArrowLeft'
const UP_KEY = 'ArrowUp'
const RIGHT_KEY = 'ArrowRight'
const DOWN_KEY = 'ArrowDown'
window.addEventListener('keydown', (e) => {
  if (e.key === LEFT_KEY || e.key === 'a') {
    e.preventDefault()
    inputs.push(new Left())
  } else if (e.key === UP_KEY || e.key === 'w') {
    e.preventDefault()
    inputs.push(new Up())
  } else if (e.key === RIGHT_KEY || e.key === 'd') {
    e.preventDefault()
    inputs.push(new Right())
  } else if (e.key === DOWN_KEY || e.key === 's') {
    e.preventDefault()
    inputs.push(new Down())
  } else if (e.key === ' ') {
    e.preventDefault()
    inputs.push(new Place())
  }
})
