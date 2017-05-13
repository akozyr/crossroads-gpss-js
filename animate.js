function step()
{
  for (var i = 0; i < activeCars.length; i++) {
    var currentCar = activeCars[i]

    if (currentCar.currentTime <= 1) {
      var point = roadRoutes[currentCar.route]
        .path.getPointAtLength(currentCar.currentTime * roadRoutes[currentCar.route].length)

      // green color
      if (
        (currentCar.roadDirection == 1 || currentCar.roadDirection == 3) && trafficLight.horizontalColor == 2 ||
        (currentCar.roadDirection == 0 || currentCar.roadDirection == 2) && trafficLight.verticalColor == 2
      ) {
        currentCar.move(point)
      } else { // red color
        if (
          currentCar.roadDirection == 0 && point.y < grassHeight ||
          currentCar.roadDirection == 2 && Math.abs(point.y) < grassHeight ||
          currentCar.roadDirection == 1 && Math.abs(point.x) < grassWidth ||
          currentCar.roadDirection == 3 && point.x < grassWidth
        ) {
          currentCar.move(point)
        }
      }
    } else {
      currentCar.destroy()
      activeCars.splice(i, 1)
    }
  }

  requestAnimationFrameID = requestAnimationFrame(step)
}
