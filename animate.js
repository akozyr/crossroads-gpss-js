function step()
{
  var coordsOfActiveCars = []

  for (var i = 0; i < activeCars.length; i++) {
    var currentCarClientRect = activeCars[i].svgElement.getBoundingClientRect()

    var absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - svgLeft
    var absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - svgTop

    coordsOfActiveCars.push({ x: absoluleCoordX, y: absoluleCoordY, id: activeCars[i].carId })
  }

  for (var i = 0; i < activeCars.length; i++) {
    var currentCar = activeCars[i]

    if (currentCar.currentTime <= 1) {
      // remove a certain car from coordsOfActiveCars
      var bufCoordsOfActiveCars = coordsOfActiveCars.slice()
      bufCoordsOfActiveCars.splice(i, 1)

      var point = roadRoutes[currentCar.route]
        .path.getPointAtLength(currentCar.currentTime * roadRoutes[currentCar.route].length)

      var xDirectionSign = Math.sign(Math.round(point.x))
      var yDirectionSign = Math.sign(Math.round(point.y))

      var currentCarClientRect = currentCar.svgElement.getBoundingClientRect()

      var absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - svgLeft
      var absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - svgTop

      if (currentCar.roadDirection == 1 || currentCar.roadDirection == 3) {
        var isTrafficAllowed = true

        if (trafficLight.horizontalColor == 0) {
          if ((Math.abs(point.x) > grassWidth * 0.9) && Math.abs(point.x) < grassWidth) {
            isTrafficAllowed = false
          }
        }

        for (var j = 0; j < bufCoordsOfActiveCars.length; j++) {
          var distance = Math.abs(absoluleCoordX - bufCoordsOfActiveCars[j].x)
            + Math.abs(absoluleCoordY - bufCoordsOfActiveCars[j].y)

          var checkXNeighbor = xDirectionSign > 0 ? (absoluleCoordX < bufCoordsOfActiveCars[j].x) : (absoluleCoordX > bufCoordsOfActiveCars[j].x)
          var checkYNeighbor = yDirectionSign > 0 ? (absoluleCoordY < bufCoordsOfActiveCars[j].y) : (absoluleCoordY > bufCoordsOfActiveCars[j].y)

          if (distance < 35) {
            console.log('id = ', bufCoordsOfActiveCars[j].id, ': ', checkXNeighbor, checkYNeighbor)

            if (xDirectionSign != 0 && yDirectionSign != 0) {
              if (checkXNeighbor && checkYNeighbor) {
                isTrafficAllowed = false
                break
              }
            } else if (xDirectionSign != 0) {
              if (checkXNeighbor) {
                isTrafficAllowed = false
                break
              }
            } else if (yDirectionSign != 0) {
              if (checkYNeighbor) {
                isTrafficAllowed = false
                break
              }
            }
          }
        }

        console.log(currentCar.carId, isTrafficAllowed, xDirectionSign, yDirectionSign)

        if (isTrafficAllowed) {
          currentCar.move(point)
        }
      }
    } else {
      currentCar.destroy()
      activeCars.splice(i, 1)
    }
  }

  alert('step')

  setTimeout(() => {
    requestAnimationFrameID = requestAnimationFrame(step)
  }, 50)
}
