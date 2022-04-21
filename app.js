const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const colors = document.querySelectorAll('.jsColor')
const range = document.querySelector('.controls__range input')
const mode = document.querySelector('#jsMode')
const save = document.querySelector('#jsSave')

canvas.width = 700
canvas.height = 700

ctx.strokeStyle = 'black'
ctx.lineWidth = '2.5'
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

let painting = false
let filling = false

function stopPainting() {
  painting = false
}

function onMouseDown(event) {
  painting = true
}

function startPainting() {
  painting = true
}

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
  ctx.fillStyle = color
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

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function handleCM(event) {
  event.preventDefault()
}

function handleSaveClick() {
  const image = canvas.toDataURL()
  const link = document.createElement('a')
  link.href = image
  link.download = 'PaintJS'
  link.click()
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', onMouseLeave)
  canvas.addEventListener('click', handleCanvasClick)
  canvas.addEventListener('contextmenu', handleCM)
}

colors.forEach((color) => {
  color.addEventListener('click', handleChangeColor)
})

range?.addEventListener('input', handleRangeChange)
mode?.addEventListener('click', handleModeChange)
save?.addEventListener('click', handleSaveClick)
