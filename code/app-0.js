var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

var x = canvas.width / 2
var y = canvas.height - 30
var ballRadius = 10

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = "red"
  ctx.fill()
  ctx.closePath()
}

function draw() {
  // draw ball
  drawBall()
  
  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)