/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */
import { drawBomb, drawBombPowerUp, drawBricks, drawCrumblyIce, drawMonster, drawPlayer } from './drawTile.js'

const TILE_SIZE = 30
const FPS = 12
const SLEEP = 900 / FPS
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void

  isAiry (): boolean

  isMonster (): boolean

  update (x?: number, y?: number): Tile
}

class AIR implements Tile {
  isAir = () => true
  isAiry = () => true
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
  }

  update (): Tile {
    return this
  }

  isMonster (): boolean {
    return false
  }
}

class UNBREAKABLE implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = drawBricks(g, 'red')//'#4d0000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  update (): Tile {
    return this
  }

  isMonster (): boolean {
    return false
  }
}

class STONE implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = drawCrumblyIce(g, '#0000cc') //'#0000cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  update (): Tile {
    return this
  }

  isMonster (): boolean {
    return false
  }
}

class BOMB implements Tile {
  constructor (private color: string) {}

  isAir = () => false

  isAiry = () => false

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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = this.color
    drawBomb(g, x, y, TILE_SIZE, this.color)
  }

  update (): Tile {
    return new BOMB_CLOSE('#c40000')
  }

  isMonster (): boolean {
    return false
  }
}

class BOMB_CLOSE implements Tile {
  constructor (private color: string) {}

  isAir = () => false

  isAiry = () => false

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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = this.color
    drawBomb(g, x, y, TILE_SIZE, this.color)
  }

  update (): Tile {
    return new BOMB_REALLY_CLOSE('#ff0000')
  }

  isMonster (): boolean {
    return false
  }
}

class BOMB_REALLY_CLOSE implements Tile {
  constructor (private color: string) {}

  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = this.color
    drawBomb(g, x, y, TILE_SIZE, this.color)
  }

  update (x: number, y: number): Tile {
    explode(x, y - 1, new FIRE())
    explode(x, y + 1, new TMP_FIRE())
    explode(x - 1, y, new FIRE())
    explode(x + 1, y, new TMP_FIRE())
    bombs++
    return new FIRE()
  }

  isMonster (): boolean {
    return false
  }
}

class TMP_FIRE implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  update (): Tile {
    return new FIRE()
  }

  isMonster (): boolean {
    return false
  }
}

class FIRE implements Tile {
  isAir = () => false
  isAiry = () => true
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#ffcc00'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  update (): Tile {
    return new AIR()
  }

  isMonster (): boolean {
    return false
  }
}

class EXTRA_BOMB implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    drawBombPowerUp(g, x, y, TILE_SIZE, '#2f4052')
  }

  update (): Tile {
    return this
  }

  isMonster (): boolean {
    return false
  }
}

class MONSTER_UP implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    drawMonster(g, x, y, x, y, TILE_SIZE, MoveDirection.UP)
  }

  update (x: number, y: number): Tile {
    if (map[y - 1][x].isAir()) {
      map[y - 1][x] = new MONSTER_UP()
      return new AIR()
    }
    return new MONSTER_RIGHT()
  }

  isMonster (): boolean {
    return true
  }
}

function movePlayer (y: number, x: number) {
  player.y += y
  player.x += x
}

class MONSTER_RIGHT implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    drawMonster(g, x, y, x, y, TILE_SIZE, MoveDirection.RIGHT)
  }

  update (x: number, y: number): Tile {
    if (map[y][x + 1].isAir()) {
      map[y][x + 1] = new TMP_MONSTER_RIGHT()
      return new AIR()
    }
    return new MONSTER_DOWN()
  }

  isMonster (): boolean {
    return true
  }
}

class TMP_MONSTER_RIGHT implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  update (): Tile {
    return new MONSTER_RIGHT()
  }

  isMonster (): boolean {
    return false
  }
}

class MONSTER_DOWN implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    drawMonster(g, x, y, x, y, TILE_SIZE, MoveDirection.DOWN)
  }

  update (x: number, y: number): Tile {
    if (map[y + 1][x].isAir()) {
      map[y + 1][x] = new TMP_MONSTER_DOWN()
      return new AIR()
    }
    return new MONSTER_LEFT()
  }

  isMonster (): boolean {
    return true
  }
}

class TMP_MONSTER_DOWN implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  update (): Tile {
    return new MONSTER_DOWN()
  }

  isMonster (): boolean {
    return false
  }
}

class MONSTER_LEFT implements Tile {
  isAir = () => false
  isAiry = () => false
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

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    drawMonster(g, x, y, x, y, TILE_SIZE, MoveDirection.LEFT)
  }
  
  update (x: number, y: number): Tile {
    if (map[y][x - 1].isAir()) {
      map[y][x - 1] = new MONSTER_LEFT()
      return new AIR()
    }
    return new MONSTER_UP()
  }

  isMonster (): boolean {
    return true
  }
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

class Player {
  public x = 1
  public y = 1

  draw (g: CanvasRenderingContext2D) {
    drawPlayer(g, player.x, player.y, TILE_SIZE)
  }
}

const player=new Player()
const rawMap: RawTile[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 1, 2, 1, 2, 1, 0, 1],
  [1, 0, 2, 0, 10, 0, 2, 0, 1],
  [1, 2, 1, 0, 1, 2, 1, 0, 1],
  [1, 0, 2, 2, 2, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 10, 0, 0, 0, 0, 0, 10, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// [
// [1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 2, 2, 2, 2, 2, 1],
//   [1, 0, 1, 2, 1, 2, 1, 2, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 2, 1, 2, 1, 2, 1, 2, 1],
//   [1, 2, 2, 2, 2, 0, 0, 0, 1],
//   [1, 2, 1, 2, 1, 0, 1, 0, 1],
//   [1, 2, 2, 2, 2, 0, 0, 10, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1],
// ]

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
      return new BOMB('#770000')
    case RawTile.BOMB_CLOSE:
      return new BOMB_CLOSE('#c40000')
    case RawTile.BOMB_REALLY_CLOSE:
      return new BOMB_REALLY_CLOSE('#ff0000')
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

enum MoveDirection {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

function transformMap () {
  map = new Array<Tile[]>(rawMap.length)
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array<Tile>(rawMap[y].length)
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
    map[player.y + y][player.x + x].isAiry()
  ) {
    movePlayer(y, x)
  } else if (map[player.y + y][player.x + x].isEXTRA_BOMB()) {
    movePlayer(y, x)
    bombs++
    map[player.y][player.x] = new AIR()
  }
}

function placeBomb () {
  if (bombs > 0) {
    map[player.y][player.x] = new BOMB('#770000')
    bombs--
  }
}

function updateMap () {
  for (let y = 1; y < map.length; y++) {
    for (let x = 1; x < map[y].length; x++) {
      map[y][x] = map[y][x].update(x, y)
    }
  }
}

function isGameOver () {
  if (map[player.y][player.x].isFIRE() || map[player.y][player.x].isMonster())
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
  if (!gameOver) player.draw(g)
}

function drawGraphics () {
  const canvas = <HTMLCanvasElement>document.getElementById('GameCanvas')
  const g = canvas.getContext('2d')
  g?.clearRect(0, 0, canvas.width, canvas.height)
  return g
}

function drawMap (g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y)
    }
  }
}

function isBombLike (position: Tile) {
  return (
    position.isBOMB() ||
    position.isBOMB_CLOSE() ||
    position.isBOMB_REALLY_CLOSE()
  )
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
