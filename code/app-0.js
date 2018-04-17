var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

var x = canvas.width / 2
var y = canvas.height - 30
var deltaX = 2
var deltaY = -2
var ballRadius = 10

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = "red"
  ctx.fill()
  ctx.closePath()
}

function draw() {
  // clears the canvas after the ball is drawn, thus removing each proir ball that is drawn
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // draw ball
  drawBall()

  // move the position of the ball, by changing the value of the balls origin point
  x += deltaX
  y += deltaY
  // this becomes recursive, so the game state/canvas is refreshed constantly
  requestAnimationFrame(draw)
}

// calls for an animation frame to be drawn using a callback (draw)
requestAnimationFrame(draw)