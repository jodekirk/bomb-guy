export function drawPlayer (g: CanvasRenderingContext2D, playerx: number, playery: number, TILESIZE: number) {
  function head (fillColor: string | CanvasGradient | CanvasPattern = '#ffad40') {
    g.beginPath()
    g.fillStyle = fillColor
    g.arc(
      playerx * TILESIZE + TILESIZE / 2,
      playery * TILESIZE + TILESIZE / 6,
      TILESIZE / 6,
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
      playerx * TILESIZE + TILESIZE / 2,
      playery * TILESIZE + TILESIZE / 1.8,
      TILESIZE / 3,
      0,
      2 * Math.PI
    )
    g.fill()
  }

  body('#ffad40')

  function ears () {
    //right ear
    g.arc(
      playerx * TILESIZE + TILESIZE / 1.5,
      playery * TILESIZE + TILESIZE / 11,
      TILESIZE / 14,
      2.2,
      1
    )
    //left ear
    g.arc(
      playerx * TILESIZE + TILESIZE / 3.2,
      playery * TILESIZE + TILESIZE / 11,
      TILESIZE / 14,
      2.2,
      1
    )
    g.fill()
  }

  ears()

  function eyes (fillColor: string | CanvasGradient | CanvasPattern = '#000') {
    g.beginPath()
    g.fillStyle = fillColor
    g.strokeStyle = '#FFF'
    //left eye
    g.arc(
      playerx * TILESIZE + TILESIZE / 2.3,
      playery * TILESIZE + TILESIZE / 8,
      TILESIZE / 24,
      0,
      2 * Math.PI
    )
    g.stroke()
    g.fill()
    //right eye
    g.beginPath()
    g.arc(
      playerx * TILESIZE + TILESIZE / 1.8,
      playery * TILESIZE + TILESIZE / 8,
      TILESIZE / 24,
      0,
      2 * Math.PI
    )
    g.stroke()
    g.fill()
  }

  eyes()

  function mouth (fillColor: string | CanvasGradient | CanvasPattern = '#F00') {
    g.beginPath()
    g.fillStyle = fillColor
    g.arc(
      playerx * TILESIZE + TILESIZE / 2,
      playery * TILESIZE + TILESIZE / 4,
      TILESIZE / 20,
      2.2,
      1
    )
    g.fill()
  }

  mouth()
}

export function drawMonster (
  g: CanvasRenderingContext2D,
  x: number,
  y: number, x1: number, y1: number, TILESIZE: number
  , direction: number, fillStyle: string | CanvasGradient | CanvasPattern): void {
  const n = Math.random()

  function body () {
    g.beginPath()
    g.fillStyle = fillStyle
    g.arc(
      x1 * TILESIZE + TILESIZE / 2,
      y1 * TILESIZE + TILESIZE / 1.8,
      TILESIZE / 2.5,
      0,
      2 * Math.PI
    )
    g.fill()
  }

  body()

  function head () {
    g.beginPath()
    g.fillStyle = '#0F0'
    g.arc(
      x1 * TILESIZE + TILESIZE / 2,
      y1 * TILESIZE + TILESIZE / 6,
      TILESIZE / 6,
      0,
      2 * Math.PI
    )
    g.fill()
  }

  head()

  function eye () {
    g.beginPath()
    g.fillStyle = '#FFF'
    g.arc(
      x1 * TILESIZE + TILESIZE / 2,
      y1 * TILESIZE + TILESIZE / 6,
      TILESIZE / 8,
      0,
      2 * Math.PI
    )
    g.fill()

    function pupil () {
      const pupilPosition = [{ x: 0, y: -3 }, { x: 3, y: 0 }, { x: 0, y: 3 }, { x: -3, y: 0 }]
      const pupilJiggle = n * 1.4 - 0.5
      g.beginPath()
      g.fillStyle = '#000'
      g.arc(
        x1 * TILESIZE + TILESIZE / 2 + pupilPosition[direction].x + pupilJiggle,
        y1 * TILESIZE + TILESIZE / 5.9 + pupilPosition[direction].y + pupilJiggle,
        TILESIZE / 21,
        0,
        2 * Math.PI
      )
      g.fill()
    }

    pupil()
  }

  eye()

  function arc (fillColor = '#FFF', dx = 1.8, dy = 1.8, radius = 6, startAngle = 0, endAngle = 2) {
    g.beginPath()
    g.fillStyle = fillColor
    g.arc(
      x1 * TILESIZE + TILESIZE / dx,
      y1 * TILESIZE + TILESIZE / dy,
      TILESIZE / radius,
      startAngle,
      endAngle
    )
    g.fill()
  }

  arc('#500000', 1.9, 1.8, n * 0.6 + 2.7, 0.2, 3.5)
  arc('#F00', 1.8, 1.3, 4, -1, 0.6)
  arc('#F22', 2, 1.4, 4, -4, -2)
  // tongue
  arc('#ffabab', 3.4, 1.2, 3, -1, n * 1.2 + 0.2)
}

export function drawBomb (g: CanvasRenderingContext2D, x: number, y: number, TILE_SIZE: number, fillStyle: string) {
  g.fillStyle = fillStyle
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

export function drawBombPowerUp (g: CanvasRenderingContext2D, x: number, y: number, TILE_SIZE: number, fillStyle: string) {
  g.strokeStyle = 'red'
  g.lineWidth = 5
  g.fillStyle = fillStyle
  g.beginPath()
  g.roundRect(x * TILE_SIZE + TILE_SIZE / 2.6, y * TILE_SIZE + TILE_SIZE / 2.6, 16, 16, 8)
  g.moveTo(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2)
  g.stroke()
  g.fill()
  g.lineWidth = 2
  g.lineTo(x * TILE_SIZE, y * TILE_SIZE + TILE_SIZE / 2.6)
  g.stroke()
}

export function drawBricks (g: CanvasRenderingContext2D, fillStyle: string) {
  const c2 = document.createElement('canvas')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const g2 = c2.getContext('2d')!
  c2.width = 30
  c2.height = 24

  function brickGradient () {
    const gradient = g2.createLinearGradient(0, 0, 30, 24)
    gradient.addColorStop(0, fillStyle)
    gradient.addColorStop(0.5, '#540000')
    gradient.addColorStop(1, '#8d0000')
    return gradient
  }

  g2.fillStyle = brickGradient()
  g2.fillRect(0, 0, c2.width, c2.height)

  function drawRectangles () {
    const w = 12, h = 10
    g2.strokeRect(1, 1, w, h)
    g2.strokeRect(16, 1, w, h)
    g2.strokeRect(-7, 13, w, h)
    g2.strokeRect(8, 13, w, h)
    g2.strokeRect(24, 13, w, h)
  }

  drawRectangles()
  const canvas = document.createElement('canvas')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext('2d')!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return ctx.createPattern(c2, 'repeat')!
}

export function drawFire (g: CanvasRenderingContext2D, x1: number, y1: number, TILESIZE: number, fillStyle: string) {
  const n = Math.random() * 1.2
  g.fillStyle = 'orange'
  g.strokeStyle = '#ffcc00' //fillStyle
  g.beginPath()
  g.ellipse(x1 * TILESIZE + TILESIZE * 0.45, y1 * TILESIZE + TILESIZE * 0.45, TILESIZE * 0.5, TILESIZE * 0.4, 1, -Math.PI, Math.PI)
  g.stroke()
  g.fill()
  g.fillStyle = '#ff7700'
  g.beginPath()
  g.roundRect(x1 * TILESIZE, y1 * TILESIZE, 22, 21, [0, 30, 50, 60])
  g.ellipse(x1 * TILESIZE + TILESIZE * 0.2, y1 * TILESIZE + TILESIZE * 0.2, 0.3, 0.2, 1, 0, 2 * Math.PI)
  g.stroke()
  g.fill()

  function arc (fillColor = fillStyle, dx = 1.8, dy = 1.8, radius = 6, startAngle = 0, endAngle = 2,rotation=false) {
    g.beginPath()
    g.fillStyle = fillColor
    g.arc(
      x1 * TILESIZE + TILESIZE / dx,
      y1 * TILESIZE + TILESIZE / dy,
      TILESIZE / radius,
      startAngle,
      endAngle,
      rotation
    )
    g.fill()
  }

  arc('#FFF', 1.9, 1.9, n * 0.6 + 2.7, 0.2, Math.PI*2)
  arc('#F00', 1.8, 1.9, 4, 1, -0.6)
  arc('#ff4040', 2, 1.9, 4, 4, 2)
  // tongue
  arc('#ffffff', 3.4, 1.95, 3, -1, n * 1.2 + 0.1)
}

export function drawCrumblyIce (g: CanvasRenderingContext2D, fillStyle: string) {
  const c2 = document.createElement('canvas')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const g2 = c2.getContext('2d')!
  c2.width = 15
  c2.height = 15

  function gradient () {
    const gradient = g2.createLinearGradient(0, 0, 16, 16)
    gradient.addColorStop(0, fillStyle)
    gradient.addColorStop(0.5, 'rgba(52,138,253,0.7)')
    gradient.addColorStop(1, fillStyle /*'#002398'*/)
    return gradient
  }

  g2.fillStyle = gradient()
  g2.fillRect(0, 0, c2.width, c2.height)

  function texture () {
    g2.strokeStyle = '#436fa4'
    g2.beginPath()
    g2.ellipse(11, 12, 2, 2, 1, -Math.PI, Math.PI)
    g2.ellipse(2, 2, 2, 2, 1, 0, 2 * Math.PI)
    g2.ellipse(9, 4, 2, 2, 1, 0, 2 * Math.PI)
    g2.stroke()
  }

  texture()
  const canvas = document.createElement('canvas')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext('2d')!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return ctx.createPattern(c2, 'repeat')!
}