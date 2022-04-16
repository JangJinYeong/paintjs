const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const colors = document.querySelectorAll('.jsColor')
const range = document.querySelector('.controls__range input')
const mode = document.querySelector('#jsMode')

canvas.width = 700
canvas.height = 700

ctx.strokeStyle = 'black'
ctx.lineWidth = '2.5'

let painting = false
let filling = false

function stopPainting() {
  painting = false
}

function onMouseDown(event) {
  painting = true
}

function startPainting() {}

function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY

  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function onMouseUp(event) {
  stopPainting()
}

function onMouseLeave(event) {
  stopPainting()
}

function handleChangeColor(event) {
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color
}

function handleRangeChange(event) {
  const size = event.target.value
  ctx.lineWidth = size
}
function handleModeChange(event) {
  if (filling === true) {
    filling = false
    mode.innerText = 'Fill'
  } else {
    filling = true
    mode.innerText = 'Paint'
  }
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', onMouseLeave)
}

colors.forEach((color) => {
  color.addEventListener('click', handleChangeColor)
})

if (range) {
  range.addEventListener('input', handleRangeChange)
}

if (mode) {
  mode.addEventListener('click', handleModeChange)
}