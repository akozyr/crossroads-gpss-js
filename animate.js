function step()
{
  var coordsOfActiveCars = []

  for (var i = 0; i < activeCars.length; i++) {
    var currentCar = activeCars[i]

    if (currentCar.currentTime <= 1) {
      var point = roadRoutes[currentCar.route]
        .path.getPointAtLength(currentCar.currentTime * roadRoutes[currentCar.route].length)

      var currentCarClientRect = currentCar.svgElement.getBoundingClientRect()

      var absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - svgLeft
      var absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - svgTop

      if (currentCar.roadDirection == 3) {
        if (trafficLight.horizontalColor == 2) {
          var isTrafficAllowed = true
          for (var j = 0; j < coordsOfActiveCars.length; j++) {
            if (
              (Math.abs(absoluleCoordX - coordsOfActiveCars[j].x) + Math.abs(absoluleCoordY - coordsOfActiveCars[j].y)) < 35
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

      if (currentCar.roadDirection == 1) {
        if (trafficLight.horizontalColor == 2) {
          var isTrafficAllowed = true
          for (var j = 0; j < coordsOfActiveCars.length; j++) {
            if (
              (Math.abs(absoluleCoordX - coordsOfActiveCars[j].x) + Math.abs(absoluleCoordY - coordsOfActiveCars[j].y)) < 35
            ) {
              isTrafficAllowed = false
              break
            }
          }
        } else if (trafficLight.horizontalColor == 0) {
          var isTrafficAllowed = true

          if (Math.abs(point.x) - 10 < grassWidth) {
            isTrafficAllowed = false
          }
        }

        if (isTrafficAllowed) {
          currentCar.move(point)
        }
      }

      coordsOfActiveCars.push({ x: absoluleCoordX, y: absoluleCoordY })
    } else {
      currentCar.destroy()
      activeCars.splice(i, 1)
    }
  }

  setTimeout(() => {
    requestAnimationFrameID = requestAnimationFrame(step)
  }, 50)
}
