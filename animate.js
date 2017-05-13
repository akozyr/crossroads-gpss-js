function step()
{
  if (activeCars.length > 0) {
    for (var i = 0; i < activeCars.length; i++) {
      var currentCar = activeCars[i]

      if (currentCar.currentTime <= 1) {
        var pathLength = roadRoutes[currentCar.route].getTotalLength()
        var p = roadRoutes[currentCar.route].getPointAtLength(currentCar.currentTime * pathLength)
        currentCar.svgElement.transform.baseVal.getItem(0).setTranslate(p.x, p.y)
        currentCar.currentTime += currentCar.deltaTime
      } else {
        currentCar.destroy()
        activeCars.splice(i, 1)
      }
    }

    requestAnimationFrameID = requestAnimationFrame(step)
  } else {
    cancelAnimationFrame(requestAnimationFrameID)
  }
}
