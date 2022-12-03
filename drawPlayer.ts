export function drawPlayer (g: CanvasRenderingContext2D, playerx: number, playery: number, tilesize: number) {
  function head (fillColor: string | CanvasGradient | CanvasPattern = '#ffad40') {
    g.beginPath()
    g.fillStyle = fillColor
    g.arc(
      playerx * tilesize + tilesize / 2,
      playery * tilesize + tilesize / 6,
      tilesize / 6,
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
      playerx * tilesize + tilesize / 2,
      playery * tilesize + tilesize / 1.8,
      tilesize / 3,
      0,
      2 * Math.PI
    )
    g.fill()
  }

  body('#ffad40')

  function ears () {
    //right ear
    g.arc(
      playerx * tilesize + tilesize / 1.5,
      playery * tilesize + tilesize / 11,
      tilesize / 14,
      2.2,
      1
    )
    //left ear
    g.arc(
      playerx * tilesize + tilesize / 3.2,
      playery * tilesize + tilesize / 11,
      tilesize / 14,
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
      playerx * tilesize + tilesize / 2.3,
      playery * tilesize + tilesize / 8,
      tilesize / 24,
      0,
      2 * Math.PI
    )
    g.stroke()
    g.fill()
    //right eye
    g.beginPath()
    g.arc(
      playerx * tilesize + tilesize / 1.8,
      playery * tilesize + tilesize / 8,
      tilesize / 24,
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
      playerx * tilesize + tilesize / 2,
      playery * tilesize + tilesize / 4,
      tilesize / 20,
      2.2,
      1
    )
    g.fill()
  }

  mouth()
}