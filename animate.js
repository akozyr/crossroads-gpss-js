function step()
{
  var coordsOfActiveCars = []

  for (var i = 0; i < activeCars.length; i++) {
    var currentCar = activeCars[i]

    if (currentCar.currentTime <= 1) {
      var point = roadRoutes[currentCar.route]
        .path.getPointAtLength(currentCar.currentTime * roadRoutes[currentCar.route].length)

      coordsOfActiveCars.push({ x: point.x, y: point.y, car_id: currentCar.carId })

      // green color
      // if (
      //   (currentCar.roadDirection == 1 || currentCar.roadDirection == 3) && trafficLight.horizontalColor == 2 ||
      //   (currentCar.roadDirection == 0 || currentCar.roadDirection == 2) && trafficLight.verticalColor == 2
      // ) {
      //   currentCar.move(point)
      // } else { // red color
      //   if (
      //     currentCar.roadDirection == 0 && point.y < grassHeight ||
      //     currentCar.roadDirection == 2 && Math.abs(point.y) < grassHeight ||
      //     currentCar.roadDirection == 1 && Math.abs(point.x) < grassWidth ||
      //     currentCar.roadDirection == 3 && point.x < grassWidth
      //   ) {
      //     currentCar.move(point)
      //   }
      // }

      if (currentCar.roadDirection == 3) {
        if (trafficLight.horizontalColor == 2) {
          var isTrafficAllowed = true
          for (var j = 0; j < coordsOfActiveCars.length; j++) {
            if (
              (Math.abs(point.x - coordsOfActiveCars[j].x) + Math.abs(point.y - coordsOfActiveCars[j].y)) < 40
              &&
              ((point.x - coordsOfActiveCars[j].x) <= 0 || (point.y - coordsOfActiveCars[j].y) <= 0)
              &&
              coordsOfActiveCars[j].car_id < currentCar.carId
            ) {
              isTrafficAllowed = false
              break
            }
          }
        } else if (trafficLight.horizontalColor == 0) {
          var isTrafficAllowed = true

          if (point.x - 10 < grassWidth) {
            isTrafficAllowed = false
          }
        }

        if (isTrafficAllowed) {
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
