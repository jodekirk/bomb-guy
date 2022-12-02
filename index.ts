/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */
const TILE_SIZE = 30
const FPS = 30
const SLEEP = 1000 / FPS
const TPS = 2
const DELAY = FPS / TPS

enum RawTile {
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

interface Tile {
  isAir (): boolean

  isUNBREAKABLE (): boolean

  isSTONE (): boolean

  isBOMB (): boolean

  isBOMB_CLOSE (): boolean

  isBOMB_REALLY_CLOSE (): boolean

  isTMP_FIRE (): boolean

  isFIRE (): boolean

  isEXTRA_BOMB (): boolean

  isMONSTER_UP (): boolean

  isMONSTER_RIGHT (): boolean

  isTMP_MONSTER_RIGHT (): boolean

  isMONSTER_DOWN (): boolean

  isTMP_MONSTER_DOWN (): boolean

  isMONSTER_LEFT (): boolean

  color (g: CanvasRenderingContext2D): void
}

class AIR implements Tile {
  isAir = () => true
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {}
}

class UNBREAKABLE implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => true
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {
    g.fillStyle = '#999999'
  }
}

class STONE implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => true
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {
    g.fillStyle = '#0000cc'
  }
}

class BOMB implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => true
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {
    g.fillStyle = '#770000'
  }
}

class BOMB_CLOSE implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => true
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {
    g.fillStyle = '#c40000'
  }
}

class BOMB_REALLY_CLOSE implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => true
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {
    g.fillStyle = '#ff0000'
  }
}

class TMP_FIRE implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => true
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {}
}

class FIRE implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => true
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {
    g.fillStyle = '#ffcc00'
  }
}

class EXTRA_BOMB implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => true
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {
    g.fillStyle = '#0f0'
  }
}

class MONSTER_UP implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => true
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {}
}

class MONSTER_RIGHT implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => true
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {}
}

class TMP_MONSTER_RIGHT implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => true
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {}
}

class MONSTER_DOWN implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => true
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {}
}

class TMP_MONSTER_DOWN implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => true
  isMONSTER_LEFT = () => false

  color (g: CanvasRenderingContext2D) {}
}

class MONSTER_LEFT implements Tile {
  isAir = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isBOMB_CLOSE = () => false
  isBOMB_REALLY_CLOSE = () => false
  isTMP_FIRE = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false
  isMONSTER_UP = () => false
  isMONSTER_RIGHT = () => false
  isTMP_MONSTER_RIGHT = () => false
  isMONSTER_DOWN = () => false
  isTMP_MONSTER_DOWN = () => false
  isMONSTER_LEFT = () => true

  color (g: CanvasRenderingContext2D) {}
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
const rawMap: RawTile[][] = [
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
let map: Tile[][]

function assertExhausted (x: never): never {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  throw new Error('Unexpected object: ' + x)
}

// eslint-disable-next-line complexity,max-lines-per-function
function transformTile (tile: RawTile) {
  switch (tile) {
    case RawTile.AIR:
      return new AIR()
    case RawTile.BOMB:
      return new BOMB()
    case RawTile.BOMB_CLOSE:
      return new BOMB_CLOSE()
    case RawTile.BOMB_REALLY_CLOSE:
      return new BOMB_REALLY_CLOSE()
    case RawTile.EXTRA_BOMB:
      return new EXTRA_BOMB()
    case RawTile.FIRE:
      return new FIRE()
    case RawTile.MONSTER_DOWN:
      return new MONSTER_DOWN()
    case RawTile.MONSTER_LEFT:
      return new MONSTER_LEFT()
    case RawTile.MONSTER_RIGHT:
      return new MONSTER_RIGHT()
    case RawTile.MONSTER_UP:
      return new MONSTER_UP()
    case RawTile.STONE:
      return new STONE()
    case RawTile.TMP_FIRE:
      return new TMP_FIRE()
    case RawTile.TMP_MONSTER_DOWN:
      return new TMP_MONSTER_DOWN()
    case RawTile.TMP_MONSTER_RIGHT:
      return new TMP_MONSTER_RIGHT()
    case RawTile.UNBREAKABLE:
      return new UNBREAKABLE()
    default:
      assertExhausted(tile)
  }
}

function transformMap () {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  map = new Array(rawMap.length)
  for (let y = 0; y < rawMap.length; y++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    map[y] = new Array(rawMap[y].length)
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x])
    }
  }
}

const inputs: Input[] = []

let delay = 0
let bombs = 1
let gameOver = false

function explode (x: number, y: number, type: Tile) {
  if (map[y][x].isSTONE()) {
    if (Math.random() < 0.1) map[y][x] = new EXTRA_BOMB()
    else map[y][x] = type
  } else if (!map[y][x].isUNBREAKABLE()) {
    if (isBombLike(map[y][x])) bombs++
    map[y][x] = type
  }
}

function move (x: number, y: number) {
  if (
    map[playery + y][playerx + x].isAir() ||
    map[playery + y][playerx + x].isFIRE()
  ) {
    playery += y
    playerx += x
  } else if (map[playery + y][playerx + x].isEXTRA_BOMB()) {
    playery += y
    playerx += x
    bombs++
    map[playery][playerx] = new AIR()
  }
}

function placeBomb () {
  if (bombs > 0) {
    map[playery][playerx] = new BOMB()
    bombs--
  }
}

function updateTile (y: number, x: number) {
  if (map[y][x].isBOMB()) {
    map[y][x] = new BOMB_CLOSE()
  } else if (map[y][x].isBOMB_CLOSE()) {
    map[y][x] = new BOMB_REALLY_CLOSE()
  } else if (map[y][x].isBOMB_REALLY_CLOSE()) {
    explode(x, y - 1, new FIRE())
    explode(x, y + 1, new TMP_FIRE())
    explode(x - 1, y, new FIRE())
    explode(x + 1, y, new TMP_FIRE())
    map[y][x] = new FIRE()
    bombs++
  } else if (map[y][x].isTMP_FIRE()) {
    map[y][x] = new FIRE()
  } else if (map[y][x].isFIRE()) {
    map[y][x] = new AIR()
  } else if (map[y][x].isTMP_MONSTER_DOWN()) {
    map[y][x] = new MONSTER_DOWN()
  } else if (map[y][x].isTMP_MONSTER_RIGHT()) {
    map[y][x] = new MONSTER_RIGHT()
  } else if (map[y][x].isMONSTER_RIGHT()) {
    if (map[y][x + 1].isAir()) {
      map[y][x] = new AIR()
      map[y][x + 1] = new TMP_MONSTER_RIGHT()
    } else {
      map[y][x] = new MONSTER_DOWN()
    }
  } else if (map[y][x].isMONSTER_DOWN()) {
    if (map[y + 1][x].isAir()) {
      map[y][x] = new AIR()
      map[y + 1][x] = new TMP_MONSTER_DOWN()
    } else {
      map[y][x] = new MONSTER_LEFT()
    }
  } else if (map[y][x].isMONSTER_LEFT()) {
    if (map[y][x - 1].isAir()) {
      map[y][x] = new AIR()
      map[y][x - 1] = new MONSTER_LEFT()
    } else {
      map[y][x] = new MONSTER_UP()
    }
  } else if (map[y][x].isMONSTER_UP()) {
    if (map[y - 1][x].isAir()) {
      map[y][x] = new AIR()
      map[y - 1][x] = new MONSTER_UP()
    } else {
      map[y][x] = new MONSTER_RIGHT()
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
  if (map[playery][playerx].isFIRE() || isMonster(map[playery][playerx]))
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

function drawTile (g: CanvasRenderingContext2D, x: number, y: number) {
  const position = map[y][x]
  position.color(g)
  if (isMonster(position)) drawMonster(g, x, y)
  if (isBombLike(position)) {
    drawBomb(g, x, y)
  } else if (!position.isAir() && !isMonster(position))
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
}

function drawMap (g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      drawTile(g, x, y)
    }
  }
}

function drawMonster (
  g: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  g.beginPath()
  g.fillStyle = '#000'
  g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  // g.fill()
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
    position.isMONSTER_UP() || position.isMONSTER_LEFT() || position.isMONSTER_RIGHT() || position.isMONSTER_DOWN()
  )
}

function isBombLike (position: Tile) {
  return (
    position.isBOMB() ||
    position.isBOMB_CLOSE() ||
    position.isBOMB_REALLY_CLOSE()
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
  transformMap()
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
