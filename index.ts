/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */
import { drawBomb, drawBombPowerUp, drawBricks, drawCrumblyIce, drawMonster, drawPlayer } from './drawTile.js'

interface RawTileValue {
  transform (): Tile
}

class AirValue implements RawTileValue {
  transform = () => new AIR()
}

class UnbreakableValue implements RawTileValue {
  transform = () => new UNBREAKABLE()
}

class StoneValue implements RawTileValue {
  transform = () => new STONE()
}

class BombValue implements RawTileValue {
  transform = () => new BOMB('#770000')
}

class Bomb_CloseValue implements RawTileValue {
  transform = () => new BOMB_CLOSE('#c40000')
}

class Bomb_Really_CloseValue implements RawTileValue {
  transform = () => new BOMB_REALLY_CLOSE('#ff0000')
}

class Tmp_FireValue implements RawTileValue {
  transform = () => new TMP_FIRE()
}

class FireValue implements RawTileValue {
  transform = () => new FIRE()
}

class Extra_BombValue implements RawTileValue {
  transform = () => new EXTRA_BOMB()
}

class Monster_UpValue implements RawTileValue {
  transform = () => new MONSTER_UP()
}

class Monster_RightValue implements RawTileValue {
  transform = () => new MONSTER_RIGHT()
}

class Tmp_Monster_RightValue implements RawTileValue {
  transform = () => new TMP_MONSTER_RIGHT()
}

class Monster_DownValue implements RawTileValue {
  transform = () => new MONSTER_DOWN()
}

class Tmp_Monster_DownValue implements RawTileValue {
  transform = () => new TMP_MONSTER_DOWN()
}

class Monster_LeftValue implements RawTileValue {
  transform = () => new MONSTER_LEFT()
}

class RawTile {
  static readonly AIR = new RawTile(new AirValue())
  static readonly UNBREAKABLE = new RawTile(new UnbreakableValue())
  static readonly STONE = new RawTile(new StoneValue())
  static readonly BOMB = new RawTile(new BombValue())
  static readonly BOMB_CLOSE = new RawTile(new Bomb_CloseValue())
  static readonly BOMB_REALLY_CLOSE = new RawTile(new Bomb_Really_CloseValue())
  static readonly TMP_FIRE = new RawTile(new Tmp_FireValue())
  static readonly FIRE = new RawTile(new FireValue())
  static readonly EXTRA_BOMB = new RawTile(new Extra_BombValue())
  static readonly MONSTER_UP = new RawTile(new Monster_UpValue())
  static readonly MONSTER_RIGHT = new RawTile(new Monster_RightValue())
  static readonly TMP_MONSTER_RIGHT = new RawTile(new Tmp_Monster_RightValue())
  static readonly MONSTER_DOWN = new RawTile(new Monster_DownValue())
  static readonly TMP_MONSTER_DOWN = new RawTile(new Tmp_Monster_DownValue())
  static readonly MONSTER_LEFT = new RawTile(new Monster_LeftValue())

  private constructor (private value: RawTileValue) {}

  transform = () => this.value.transform()
}

const RAW_TILES = [
  RawTile.AIR,
  RawTile.UNBREAKABLE,
  RawTile.STONE,
  RawTile.BOMB,
  RawTile.BOMB_CLOSE,
  RawTile.BOMB_REALLY_CLOSE,
  RawTile.TMP_FIRE,
  RawTile.FIRE,
  RawTile.EXTRA_BOMB,
  RawTile.MONSTER_UP,
  RawTile.MONSTER_RIGHT,
  RawTile.TMP_MONSTER_RIGHT,
  RawTile.MONSTER_DOWN,
  RawTile.TMP_MONSTER_DOWN,
  RawTile.MONSTER_LEFT
]

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

  update (map: Tile[][], x?: number, y?: number): Tile

  explode (map: Tile[][], x: number, y: number, type: Tile): void
}

class AIR implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile) {
    // map[y][x] = type
  }

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
  explode (map: Tile[][], x: number, y: number, type: Tile) { }

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
    g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
  }

  update (): Tile {
    return this
  }

  isMonster (): boolean {
    return false
  }
}

class STONE implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile) {
    if (Math.random() < 0.1) map[y][x] = new EXTRA_BOMB()
    // else map[y][x] = type
  }

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
    g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
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

  explode (map: Tile[][], x: number, y: number, type: Tile) {
    bombs++
    map[y][x] = type
  }

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
    drawBomb(g, x, y, game.TILE_SIZE, this.color)
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

  explode (map: Tile[][], x: number, y: number, type: Tile) {
    // bombs++
    // map[y][x] = type
  }

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
    drawBomb(g, x, y, game.TILE_SIZE, this.color)
  }

  update (): Tile {
    return new BOMB_REALLY_CLOSE('#ff0000')
  }

  isMonster (): boolean {
    return false
  }
}

function explodeSurroundingStones (map: Tile[][], y: number, x: number) {
  map[y][x].explode(map, x, y - 1, new FIRE())
  map[y][x].explode(map, x, y + 1, new TMP_FIRE())
  map[y][x].explode(map, x - 1, y, new FIRE())
  map[y][x].explode(map, x + 1, y, new TMP_FIRE())
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
    drawBomb(g, x, y, game.TILE_SIZE, this.color)
  }

  explode (map: Tile[][], x: number, y: number, type: Tile) {
    if (map[y][x].isSTONE()) {
      if (Math.random() < 0.1) map[y][x] = new EXTRA_BOMB()
      else map[y][x] = type
    } else if (!map[y][x].isUNBREAKABLE()) {
      if (this.isBombLike(map[y][x])) bombs++
      map[y][x] = type
    }
  }

  isBombLike = (position: Tile) =>
    position.isBOMB() ||
    position.isBOMB_CLOSE() ||
    position.isBOMB_REALLY_CLOSE()

  update (map: Tile[][], x: number, y: number): Tile {
    explodeSurroundingStones(map, y, x)
    bombs++
    return new FIRE()
  }

  isMonster (): boolean {
    return false
  }
}

class TMP_FIRE implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile) {
    // map[y][x] = type
  }

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
    g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
  }

  update (): Tile {
    return new FIRE()
  }

  isMonster (): boolean {
    return false
  }
}

class FIRE implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile) {
    map[y][x] = type
  }

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
    g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
  }

  update (): Tile {
    return new AIR()
  }

  isMonster (): boolean {
    return false
  }
}

class EXTRA_BOMB implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile) {
    // map[y][x] = type
  }

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
    drawBombPowerUp(g, x, y, game.TILE_SIZE, '#2f4052')
  }

  update (): Tile {
    return this
  }

  isMonster (): boolean {
    return false
  }
}

class MONSTER_UP implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile) {
    // map[y][x] = type
  }

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
    drawMonster(g, x, y, x, y, game.TILE_SIZE, MoveDirection.UP)
  }

  update (map: Tile[][], x: number, y: number): Tile {
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

class MONSTER_RIGHT implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile): void {
    // map[y][x] = type
  }

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
    drawMonster(g, x, y, x, y, game.TILE_SIZE, MoveDirection.RIGHT)
  }

  update (map: Tile[][], x: number, y: number): Tile {
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
  explode (map: Tile[][], x: number, y: number, type: Tile): void {
    // map[y][x] = type
  }

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
    g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
  }

  update (): Tile {
    return new MONSTER_RIGHT()
  }

  isMonster (): boolean {
    return false
  }
}

class MONSTER_DOWN implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile): void {
    // map[y][x] = type
  }

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
    drawMonster(g, x, y, x, y, game.TILE_SIZE, MoveDirection.DOWN)
  }

  update (map: Tile[][], x: number, y: number): Tile {
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
  explode (map: Tile[][], x: number, y: number, type: Tile): void {
    // map[y][x] = type
  }

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
    g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
  }

  update (): Tile {
    return new MONSTER_DOWN()
  }

  isMonster (): boolean {
    return false
  }
}

class MONSTER_LEFT implements Tile {
  explode (map: Tile[][], x: number, y: number, type: Tile): void {
    // map[y][x] = type
  }

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
    drawMonster(g, x, y, x, y, game.TILE_SIZE, MoveDirection.LEFT)
  }

  update (map: Tile[][], x: number, y: number): Tile {
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
  handle (game: Game): void
}

class Up implements Input {
  handle (game: Game): void {
    game.player.tryMove(game.map.map, 0, -1)
  }
}

class Down implements Input {
  handle (game: Game): void {
    game.player.tryMove(game.map.map, 0, 1)
  }
}

class Left implements Input {
  handle (game: Game): void {
    game.player.tryMove(game.map.map, -1, 0)
  }
}

class Right implements Input {
  handle (game: Game): void {
    game.player.tryMove(game.map.map, 1, 0)
  }
}

class Place implements Input {
  handle (game: Game): void {
    game.player.placeBomb()
  }
}

class Game {
  public TILE_SIZE = 30
  readonly player: Player
  readonly map: Map
  public gameOver = false
  private FPS = 12
  private SLEEP = 900 / this.FPS
  private TPS = 2
  private DELAY = this.FPS / this.TPS

  constructor (rawMap: number[][]) {
    this.player = new Player()
    this.map = new Map(rawMap)
  }

  isGameOver () {
    if (this.map.map[this.player.getY()][this.player.getX()].isFIRE() || this.map.map[this.player.getY()][this.player.getX()].isMonster())
      this.gameOver = true
  }

  loop () {
    const before = Date.now()
    this.update(this.map)
    this.draw()
    const after = Date.now()
    setTimeout(() => this.loop(), this.sleep(before, after))
  }

  draw () {
    const g = drawGraphics()
    if (!g) return
    this.drawMap(g, this.map.map)
    if (!this.gameOver) this.player.draw(g)
  }

  sleep (before: number, after: number) {
    const frameTime = after - before
    return this.SLEEP - frameTime
  }

  update (map: Map) {
    handleInputs(game)
    game.isGameOver()
    if (--delay > 0) return
    delay = this.DELAY
    map.update()
  }

  drawMap (g: CanvasRenderingContext2D, map: Tile[][]) {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        map[y][x].draw(g, x, y)
      }
    }
  }
}

class Map {
  public map: Tile[][] = []

  constructor (rawMap: number[][]) {
    const map = new Array<Tile[]>(rawMap.length)
    for (let y = 0; y < rawMap.length; y++) {
      map[y] = new Array<Tile>(rawMap[y].length)
      for (let x = 0; x < rawMap[y].length; x++) {
        map[y][x] = RAW_TILES[rawMap[y][x]].transform()
      }
    }
    this.map = map
  }

  update () {
    for (let y = 1; y < this.map.length; y++) {
      for (let x = 1; x < this.map[y].length; x++) {
        this.map[y][x] = this.map[y][x].update(this.map, x, y)
      }
    }
  }
}

class Player {
  private x = 1
  private y = 1
  getY = () => this.y
  getX = () => this.x

  draw (g: CanvasRenderingContext2D) {
    drawPlayer(g, this.x, this.y, game.TILE_SIZE)
  }

  tryMove (map: Tile[][], x: number, y: number) {
    if (
      map[this.y + y][this.x + x].isAiry()
    ) {
      this.move(y, x)
    } else if (map[this.y + y][this.x + x].isEXTRA_BOMB()) {
      this.move(y, x)
      bombs++
      map[this.y][this.x] = new AIR()
    }
  }

  placeBomb () {
    if (bombs > 0) {
      game.map.map[this.y][this.x] = new BOMB('#770000')
      bombs--
    }
  }

  private move (y: number, x: number) {
    this.y += y
    this.x += x
  }
}

const rawMap: number[][] = [
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

const game = new Game(rawMap)

enum MoveDirection {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

const inputs: Input[] = []

let delay = 0
let bombs = 1

function handleInputs (game: Game) {
  while (!game.gameOver && inputs.length > 0) {
    const input = inputs.pop()
    input?.handle(game)
  }
}

function drawGraphics () {
  const canvas = <HTMLCanvasElement>document.getElementById('GameCanvas')
  const g = canvas.getContext('2d')
  g?.clearRect(0, 0, canvas.width, canvas.height)
  return g
}

window.onload = () => {
  game.loop()
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
