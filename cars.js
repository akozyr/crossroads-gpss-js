var car = document.createElementNS(ns, 'circle')

car.setAttribute('cx', 0)
car.setAttribute('cy', grassHeight + roadWidth * 0.75)
car.setAttribute('r', 15)
car.setAttribute('fill', 'blue')

svg.append(car)

var pathData = 'M' + 0 + ',' + 0
  + 'H' + grassWidth + 'q' + roadWidth / 4 + ',' + 0 + ',' +
  + roadWidth / 4 + ',' + roadWidth / 4 + 'v' + grassHeight

var path = document.createElementNS(ns, 'path')

path.setAttribute('d', pathData)
path.setAttribute('fill', 'none')
path.setAttribute('id', 'path1')
svg.append(path)

car.transform.baseVal.appendItem(svg.createSVGTransform())

var pathLength = path.getTotalLength()
var duration = 100
var deltaTime = 1 / duration
var currentTime = 0

requestAnimationFrameID = requestAnimationFrame(doAnim);

function doAnim()
{
  var p = path.getPointAtLength(currentTime * pathLength)
  car.transform.baseVal.getItem(0).setTranslate(p.x, p.y)
  currentTime += deltaTime

  requestAnimationFrameID = requestAnimationFrame(doAnim)
}

function onRun()
{
  requestAnimationFrameID = requestAnimationFrame(doAnim)
}

function onStop()
{
  cancelAnimationFrame(requestAnimationFrameID)
}
