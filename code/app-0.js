var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

// ball dimesnions
var x = canvas.width / 2
var y = canvas.height - 30
var ballRadius = 10
// ball direction
var deltaX = 2
var deltaY = -2

// paddle dimensions
var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width - paddleWidth) / 2

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = "red"
  ctx.fill()
  ctx.closePath()
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "black"
  ctx.fill()
  ctx.closePath()
}

function draw() {
  // clears the canvas after the ball is drawn, thus removing each proir ball that is drawn
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw ball & paddle
  drawBall()
  drawPaddle()

  // check for collisions
  if (x + deltaX > canvas.width - ballRadius || x + deltaX < ballRadius) {
    deltaX = -deltaX
  }

  if (y + deltaY < ballRadius) {
    deltaY = -deltaY
  }

  // move the position of the ball, by changing the value of the balls origin point
  x += deltaX
  y += deltaY
  // this becomes recursive, so the game state/canvas is refreshed constantly
  requestAnimationFrame(draw)
}

// calls for an animation frame to be drawn using a callback (draw)
requestAnimationFrame(draw)