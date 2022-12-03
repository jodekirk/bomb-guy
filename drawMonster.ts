export function drawMonster (
  g: CanvasRenderingContext2D,
  x: number,
  y: number, x1: number, y1: number, tilesize: number
): void {
  function background () {
    g.fillStyle = '#000'
    g.fillRect(x1 * tilesize, y1 * tilesize, tilesize, tilesize)
  }

  background()

  function body () {
    g.beginPath()
    g.fillStyle = '#005400'
    g.arc(
      x1 * tilesize + tilesize / 2,
      y1 * tilesize + tilesize / 1.8,
      tilesize / 2.5,
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
      x1 * tilesize + tilesize / 2,
      y1 * tilesize + tilesize / 6,
      tilesize / 6,
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
      x1 * tilesize + tilesize / 2,
      y1 * tilesize + tilesize / 6,
      tilesize / 11,
      0,
      2 * Math.PI
    )
    g.fill()

    function pupil () {
      g.beginPath()
      g.fillStyle = '#000'
      g.arc(
        x1 * tilesize + tilesize / 2,
        y1 * tilesize + tilesize / 4.5,
        tilesize / 19,
        0,
        2 * Math.PI
      )
      g.fill()
    }

    pupil()
  }

  eye()

  function tooth (fillColor = '#FFF', dx = 1.8, dy = 1.8, radius = 6, startAngle = 0, endAngle = 2) {
    g.beginPath()
    g.fillStyle = fillColor
    g.arc(
      x1 * tilesize + tilesize / dx,
      y1 * tilesize + tilesize / dy,
      tilesize / radius,
      startAngle,
      endAngle
    )
    g.fill()
  }

  tooth('#500000', 1.8, 1.8, 3, 0.2, 3.5)
  tooth('#F00', 1.8, 1.3, 4, -1, 0.6)
  tooth('#ffabab', 3.4, 1.2, 4, -1, 0.8)
  tooth('#F22', 2, 1.4, 4, -4, -2)
}