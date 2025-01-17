/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */
import { drawBomb, drawBombPowerUp, drawBricks, drawCrumblyIce, drawFire, drawMonster, drawPlayer } from './drawTile.js'

interface RawTileValue {
  transform (): Tile
}

enum MoveDirection {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

function RandomColor () {
  return Math.floor(Math.random() * 16777215).toString(16)
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
  transform = () => new BOMB()
}

class Bomb_CloseValue implements RawTileValue {
  transform = () => new BOMB(new MEDIUM_DELAY())
}

class Bomb_Really_CloseValue implements RawTileValue {
  transform = () => new BOMB(new SHORT_DELAY())
}

class Tmp_FireValue implements RawTileValue {
  transform = () => new FIRE(new TmpFire())
}

class FireValue implements RawTileValue {
  transform = () => new FIRE()
}

class Extra_BombValue implements RawTileValue {
  transform = () => new EXTRA_BOMB()
}

class Monster_UpValue implements RawTileValue {
  transform = () => new MONSTER(new Facing_Up(), RandomColor())
}

class Monster_RightValue implements RawTileValue {
  transform = () => new MONSTER(new Facing_Right(), RandomColor())
}

class Tmp_Monster_RightValue implements RawTileValue {
  transform = () => new TMP_MONSTER_RIGHT()
}

class Monster_DownValue implements RawTileValue {
  transform = () => new MONSTER(new Facing_Down(), RandomColor())
}

class Tmp_Monster_DownValue implements RawTileValue {
  transform = () => new TMP_MONSTER_DOWN()
}

class Monster_LeftValue implements RawTileValue {
  transform = () => new MONSTER(new Facing_Left(), RandomColor())
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

  isFIRE (): boolean

  isEXTRA_BOMB (): boolean

  isAiry (): boolean

  isMonster (): boolean

  draw (g: CanvasRenderingContext2D, x: number, y: number): void

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
  isFIRE = () => false
  isEXTRA_BOMB = () => false

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
  isFIRE = () => false
  isEXTRA_BOMB = () => false

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
  isFIRE = () => false
  isEXTRA_BOMB = () => false

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

interface BombDelay {
  color: string

  explode (map: Tile[][], x: number, y: number, type: Tile): void

  update (map: Tile[][], x: number, y: number): Tile
}

class LONG_DELAY implements BombDelay {
  public color = '#770000'

  explode (map: Tile[][], x: number, y: number, type: Tile): void {
    game.bombs.increment()
    map[y][x] = type
  }

  update (map: Tile[][], x: number, y: number): Tile {
    return new BOMB(new MEDIUM_DELAY())
  }
}

class MEDIUM_DELAY implements BombDelay {
  public color = '#c40000'

  explode (map: Tile[][], x: number, y: number, type: Tile): void {
  }

  update (map: Tile[][], x: number, y: number): Tile {
    return new BOMB(new SHORT_DELAY())
  }
}

class SHORT_DELAY implements BombDelay {
  public color = '#ff0000'

  explode(map: Tile[][], x: number, y: number, type: Tile): void {
    if (map[y][x].isSTONE()) {
      if (Math.random() < 0.1) map[y][x] = new EXTRA_BOMB()
      else map[y][x] = type
    } else if (!map[y][x].isUNBREAKABLE()) {
      if (map[y][x].isBOMB()) game.bombs.increment()
      map[y][x] = type
    }
  }

  update(map: Tile[][], x: number, y: number): Tile {
    explodeSurroundingStones(map, y, x)
    game.bombs.increment()
    // https://orangefreesounds.com/boom-sound-effect/
    playBoom()
    return new FIRE()
  }
}

class BOMB implements Tile {
  constructor(private delayStrategy: BombDelay = new LONG_DELAY()) {}

  explode(map: Tile[][], x: number, y: number, type: Tile) {
    this.delayStrategy.explode(map, x, y, type)
  }

  isAir = () => false

  isAiry = () => false

  isUNBREAKABLE = () => false

  isSTONE = () => false

  isBOMB = () => true

  isFIRE = () => false

  isEXTRA_BOMB = () => false

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    drawBomb(g, x, y, game.TILE_SIZE, this.delayStrategy.color)
  }

  update(map: Tile[][], x: number, y: number): Tile {
    return this.delayStrategy.update(map, x, y)
  }

  isMonster(): boolean {
    return false
  }
}

function explodeSurroundingStones(map: Tile[][], y: number, x: number) {
  map[y][x].explode(map, x, y - 1, new FIRE(new RegularFire(), '#ffbf6b'))
  map[y][x].explode(map, x, y + 1, new FIRE(new TmpFire(), '#012b54'))
  map[y][x].explode(map, x - 1, y, new FIRE(new RegularFire(), '#ff9100'))
  map[y][x].explode(map, x + 1, y, new FIRE(new TmpFire(), '#0080ff'))
}

interface TempFire {
  isTmpFire: boolean

  update(): void
}

class TmpFire implements TempFire {
  isTmpFire = true

  update(): Tile {
    return new FIRE()
  }
}

class RegularFire implements TempFire {
  isTmpFire = false

  update(): Tile {
    return new AIR()
  }
}

const audioElement = InitializeAudio('sounds/Boom-sound-effect.mp3')

function InitializeAudio(sound: string) {
  const audioElement = new Audio(sound)
  audioElement.volume = 0.5
  return audioElement
}

function playBoom() {
  // if (!audioElement.paused) {
  //   // skip playing since already playing
  // } else {
  void audioElement.play()
  // }
}

class FIRE implements Tile {
  private readonly fillStyle: string | CanvasGradient | CanvasPattern

  constructor(
    private TmpFireStrategy = new RegularFire(),
    fillStyle?: string | CanvasGradient | CanvasPattern
  ) {
    this.fillStyle = fillStyle ?? '#ffcc00'
  }

  explode(map: Tile[][], x: number, y: number, type: Tile) {
    map[y][x] = type
  }

  isAir = () => false
  isAiry = () => true
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isFIRE = () => !this.TmpFireStrategy.isTmpFire
  isEXTRA_BOMB = () => false

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#ffff00'
    drawFire(g, x, y, game.TILE_SIZE, this.fillStyle.toString())
    //g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
  }

  update(): Tile {
    return this.TmpFireStrategy.update()
  }

  isMonster(): boolean {
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
  isFIRE = () => false
  isEXTRA_BOMB = () => true

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

interface Monster_Direction {
  DIRECTION: MoveDirection

  update (map: Tile[][], x: number, y: number): Tile
}

class Facing_Up implements Monster_Direction {
  public DIRECTION = MoveDirection.UP

  update (map: Tile[][], x: number, y: number): Tile {
    if (map[y - 1][x].isAir()) {
      map[y - 1][x] = new MONSTER(new Facing_Up())
      return new AIR()
    }
    return new MONSTER(new Facing_Right())
  }
}

class Facing_Right implements Monster_Direction {
  public DIRECTION = MoveDirection.RIGHT

  update (map: Tile[][], x: number, y: number): Tile {
    if (map[y][x + 1].isAir()) {
      map[y][x + 1] = new TMP_MONSTER_RIGHT()
      return new AIR()
    }
    return new MONSTER(new Facing_Down())
  }
}

class Facing_Down implements Monster_Direction {
  public DIRECTION = MoveDirection.DOWN

  update (map: Tile[][], x: number, y: number): Tile {
    if (map[y + 1][x].isAir()) {
      map[y + 1][x] = new TMP_MONSTER_DOWN()
      return new AIR()
    }
    return new MONSTER(new Facing_Left())
  }
}

class Facing_Left implements Monster_Direction {
  public DIRECTION = MoveDirection.LEFT

  update (map: Tile[][], x: number, y: number): Tile {
    if (map[y][x - 1].isAir()) {
      map[y][x - 1] = new MONSTER(new Facing_Left())
      return new AIR()
    }
    return new MONSTER(new Facing_Up())
  }
}

class MONSTER implements Tile {
  private readonly fillStyle

  constructor (private direction: Monster_Direction = new Facing_Up(), fillStyle?: string | CanvasGradient | CanvasPattern) {
    this.fillStyle = fillStyle ?? '#006500'
  }

  explode (map: Tile[][], x: number, y: number, type: Tile) {
    // map[y][x] = type
  }

  isAir = () => false
  isAiry = () => false
  isUNBREAKABLE = () => false
  isSTONE = () => false
  isBOMB = () => false
  isFIRE = () => false
  isEXTRA_BOMB = () => false

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    drawMonster(g, x, y, x, y, game.TILE_SIZE, this.direction.DIRECTION, this.fillStyle)
    // drawFire(g, x, y, game.TILE_SIZE, this.fillStyle.toString())

  }

  update (map: Tile[][], x: number, y: number): Tile {
    return this.direction.update(map, x, y)
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
  isFIRE = () => false
  isEXTRA_BOMB = () => false

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    // g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
  }

  update (): Tile {
    return new MONSTER(new Facing_Right())
  }

  isMonster (): boolean {
    return false
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
  isFIRE = () => false
  isEXTRA_BOMB = () => false

  draw (g: CanvasRenderingContext2D, x: number, y: number) {
    // g.fillRect(x * game.TILE_SIZE, y * game.TILE_SIZE, game.TILE_SIZE, game.TILE_SIZE)
  }

  update (): Tile {
    return new MONSTER(new Facing_Down())
  }

  isMonster (): boolean {
    return false
  }
}

interface Input {
  handle (): void
}

class Up implements Input {
  handle (): void {
    game.player.tryMove(game.map.map, 0, -1)
  }
}

class Down implements Input {
  handle (): void {
    game.player.tryMove(game.map.map, 0, 1)
  }
}

class Left implements Input {
  handle (): void {
    game.player.tryMove(game.map.map, -1, 0)
  }
}

class Right implements Input {
  handle (): void {
    game.player.tryMove(game.map.map, 1, 0)
  }
}

class Place implements Input {
  handle (): void {
    game.placeBomb()
  }
}

class Game {
  public TILE_SIZE = 30
  readonly player: Player
  readonly map: Map
  public bombs = new Bombs()
  private gameOver = false
  private FPS = 12
  private SLEEP = 900 / this.FPS
  private TPS = 2
  private DELAY = this.FPS / this.TPS

  constructor (rawMap: number[][]) {
    this.player = new Player()
    this.map = new Map(rawMap)
    this.addTouchControls();
  }

  addTouchControls() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let lastTapTime = 0;
    let lastTapX = 0;
    let lastTapY = 0;
    let tapCount = 0;
    const DOUBLE_TAP_DELAY = 400;
    const TAP_DISTANCE_THRESHOLD = 30;
    const SWIPE_THRESHOLD = 30;
    const MIN_TAP_DURATION = 50;
    const MAX_TAP_DURATION = 150;

    const handleTap = (e: TouchEvent) => {
        const currentTime = Date.now();
        const touchDuration = currentTime - touchStartTime;
        const touchDistance = Math.sqrt(
            Math.pow(touchEndX - touchStartX, 2) + 
            Math.pow(touchEndY - touchStartY, 2)
        );

        // Ignore if touch duration or distance indicates a swipe
        if (touchDuration < MIN_TAP_DURATION || 
            touchDuration > MAX_TAP_DURATION || 
            touchDistance > TAP_DISTANCE_THRESHOLD) {
            return false;
        }

        if (currentTime - lastTapTime > DOUBLE_TAP_DELAY) {
            tapCount = 0;
        }

        tapCount++;

        // Check for double tap
        if (tapCount === 2) {
            const tapDistance = Math.sqrt(
                Math.pow(touchEndX - lastTapX, 2) + 
                Math.pow(touchEndY - lastTapY, 2)
            );

            if (currentTime - lastTapTime <= DOUBLE_TAP_DELAY && 
                tapDistance < TAP_DISTANCE_THRESHOLD) {
                this.placeBomb();
                tapCount = 0;
                e.preventDefault();
                return true;
            }
            tapCount = 0;
        }

        // Store tap data for next comparison
        lastTapTime = currentTime;
        lastTapX = touchEndX;
        lastTapY = touchEndY;
        return false;
    };

    const handleSwipe = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Only handle as swipe if movement is greater than threshold
      if (Math.abs(deltaX) > SWIPE_THRESHOLD || Math.abs(deltaY) > SWIPE_THRESHOLD) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
              if (deltaX > 0) {
                  this.player.tryMove(this.map.map, 1, 0);
              } else {
                  this.player.tryMove(this.map.map, -1, 0);
              }
          } else {
              if (deltaY > 0) {
                  this.player.tryMove(this.map.map, 0, 1);
              } else {
                  this.player.tryMove(this.map.map, 0, -1);
              }
          }
          return true;
      }
      return false;
  };

    document.addEventListener('touchstart', (e: TouchEvent) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        touchStartTime = Date.now();
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', (e: TouchEvent) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        if (!handleTap(e)) {
            handleSwipe();
        }
        e.preventDefault();
    }, { passive: false });
}

  isGameOver () {
    if (this.map.map[this.player.getY()][this.player.getX()].isFIRE() || this.map.map[this.player.getY()][this.player.getX()].isMonster())
      this.gameOver = true
  }

  loop () {
    const before = Date.now()
    this.update()
    this.draw()
    const after = Date.now()
    setTimeout(() => this.loop(), this.sleep(before, after))
  }

  draw () {
    const g = this.drawGraphics()
    if (!g) return
    this.drawMap(g, this.map.map)
    if (!this.gameOver) this.player.draw(g)
  }

  sleep (before: number, after: number) {
    const frameTime = after - before
    return this.SLEEP - frameTime
  }

  update () {
    this.handleInputs()
    this.isGameOver()
    if (--delay > 0) return
    delay = this.DELAY
    this.map.update()
  }

  drawMap (g: CanvasRenderingContext2D, map: Tile[][]) {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        map[y][x].draw(g, x, y)
      }
    }
  }

  handleInputs () {
    while (!this.gameOver && inputs.length > 0) {
      const input = inputs.pop()
      input?.handle()
    }
  }

  placeBomb () {
    if (this.bombs.count() > 0) {
      this.map.map[this.player.getY()][this.player.getX()] = new BOMB(new LONG_DELAY())
      this.bombs.decrement()
    }
  }

  private drawGraphics () {
    const canvas = <HTMLCanvasElement>document.getElementById('GameCanvas')
    const g = canvas.getContext('2d')
    g?.clearRect(0, 0, canvas.width, canvas.height)
    return g
  }
}

class Bombs {
  private bombs = 1
  count = () => this.bombs
  increment = () => this.bombs++
  decrement = () => this.bombs--
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
      game.bombs.increment()
      map[this.y][this.x] = new AIR()
    }
  }

  placeBomb(map: Tile[][]) {
    game.bombs.increment();
    map[this.y][this.x] = new BOMB();
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

let delay = 0

window.onload = () => {
  game.loop()
}

const inputs: Input[] = []

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
