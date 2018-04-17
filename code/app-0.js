var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

// ball dimesnions
var x = canvas.width / 2
var y = canvas.height - 30
var ballRadius = 10
// ball direction movement
var deltaX = 2
var deltaY = -2

// paddle dimensions
var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width - paddleWidth) / 2
// paddle movement
var paddleDeltaX = 7

var rightPressed
var leftPressed

function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true
  } else if (event.keyCode == 37) {
    leftPressed = true
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = false
  } else if (event.keyCode == 37) {
    leftPressed = false
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

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

  // check for collisions on the x axis
  if (x + deltaX > canvas.width - ballRadius || x + deltaX < ballRadius) {
    // change X direction
    deltaX = -deltaX
  }

  // check for collisions on the y axis and paddle
  // if (y + deltaY < ballRadius) {
  //   deltaY = -deltaY
  // }
  if(
    // top wall check
    y + deltaY < ballRadius || 
    (
      // paddle check
      y + deltaY > canvas.height - paddleHeight - ballRadius &&
      // left boundary of the paddle
      x + deltaX > paddleX &&
      // right boundary of the paddle
      x + deltaX < paddleX + paddleWidth
    )
  ) {
    // change Y direction
    deltaY = -deltaY
  } else if (y + deltaY > canvas.height) {
    location.reload()
  }

  // paddle movement and canvas boundaries
  if (rightPressed && (paddleX + paddleWidth) < canvas.width) {
    paddleX += paddleDeltaX
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleDeltaX
  }

  // move the position of the ball, by changing the value of the balls origin point
  x += deltaX
  y += deltaY
  // this becomes recursive, so the game state/canvas is refreshed constantly
  requestAnimationFrame(draw)
}

// calls for an animation frame to be drawn using a callback (draw)
requestAnimationFrame(draw)