function startAnimation()
{
  requestAnimationFrameID = requestAnimationFrame(step);
}

function step()
{
  for (var i = 0; i < cars.length; i++) {
    var currentCar = cars[i]

    var pathLength = roadRoutes[currentCar.route].getTotalLength()
    var p = roadRoutes[currentCar.route].getPointAtLength(currentCar.currentTime * pathLength)
    currentCar.svgElement.transform.baseVal.getItem(0).setTranslate(p.x, p.y)
    currentCar.currentTime += currentCar.deltaTime
  }

  requestAnimationFrameID = requestAnimationFrame(step)
}
